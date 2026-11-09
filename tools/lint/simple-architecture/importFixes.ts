import fs from 'node:fs';
import path from 'node:path';

import type { ESTree, Fixer, SourceCode } from 'vite-plus/lint/plugins';

type Import = ESTree.ImportDeclaration;

/** Checks the names a barrel (`<dir>/index.ts`) re-exports; null when there is no barrel. */
const barrelExportsOf = (dir: string) => {
  const barrel = path.join(dir, 'index.ts');
  if (!fs.existsSync(barrel)) return null;
  const text = fs.readFileSync(barrel, 'utf8');
  return (name: string) => new RegExp(`\\b${name}\\b`).test(text);
};

/** Imported names, or null for default/namespace imports that a barrel cannot replace. */
const importedNames = (node: Import) => {
  const names: string[] = [];
  for (const specifier of node.specifiers) {
    if (specifier.type !== 'ImportSpecifier') return null;
    const { imported } = specifier;
    names.push(imported.type === 'Identifier' ? imported.name : imported.value);
  }
  return names;
};

const quoteOf = (node: Import) => node.source.raw?.[0] ?? "'";

/** `…/Name/Name` or `…/Name/Name.types` → `…/Name`, when the barrel exports every imported name. */
export const barrelFix = (node: Import, specifier: string, ownerDir: string) => {
  const names = importedNames(node);
  const exportsName = barrelExportsOf(ownerDir);
  if (!names || names.length === 0 || !exportsName || !names.every(exportsName)) return undefined;

  const quote = quoteOf(node);
  const target = specifier.slice(0, specifier.lastIndexOf('/'));
  return (fixer: Fixer) => fixer.replaceText(node.source, `${quote}${target}${quote}`);
};

/** `@/components/ui/x` → `@/components/<Name>` per imported name, when every name has a wrapper. */
export const vendorUiFix = (node: Import, componentsDir: string, sourceCode: SourceCode) => {
  const names = importedNames(node);
  if (!names || names.length === 0) return undefined;

  const groups = new Map<string, string[]>();
  for (const [index, name] of names.entries()) {
    const exportsName = barrelExportsOf(path.join(componentsDir, name));
    const specifier = node.specifiers[index];
    if (!exportsName?.(name) || !specifier) return undefined;
    groups.set(name, [...(groups.get(name) ?? []), sourceCode.getText(specifier)]);
  }

  const keyword = node.importKind === 'type' ? 'import type' : 'import';
  const quote = quoteOf(node);
  const imports = [...groups].map(
    ([wrapper, specifiers]) =>
      `${keyword} { ${specifiers.join(', ')} } from ${quote}@/components/${wrapper}${quote};`,
  );
  return (fixer: Fixer) => fixer.replaceText(node, imports.join('\n'));
};
