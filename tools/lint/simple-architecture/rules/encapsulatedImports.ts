import fs from 'node:fs';
import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import {
  componentNameOf,
  isComponentDir,
  isInside,
  resolveSpecifier,
  srcRootOf,
} from '../paths.ts';

export const encapsulatedImports = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Component internals are imported only through the barrel.' },
    messages: {
      barrel:
        'Импорт мимо barrel: `{{specifier}}`. Снаружи папки компонента `{{name}}` импортируй саму папку (её `index.ts`).',
      vendorUi:
        'shadcn-примитивы (`{{specifier}}`) используются только в обёртках `src/components/<Name>/`. Импортируй обёртку из `@/components`.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const specifier = node.source.value;
        const resolved = resolveSpecifier(specifier, filename, cwd);
        if (!resolved) return;

        const componentsDir = path.join(srcRootOf(cwd), 'components');
        const uiDir = path.join(componentsDir, 'ui');
        if (isInside(resolved, uiDir)) {
          if (!isInside(filename, componentsDir)) {
            context.report({ node, messageId: 'vendorUi', data: { specifier } });
          }
          return;
        }

        const isDirImport = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory();
        if (isDirImport) return;

        const ownerDir = path.dirname(resolved);
        if (!isComponentDir(ownerDir, cwd)) return;
        if (isInside(filename, ownerDir)) return;

        const name = componentNameOf(ownerDir, cwd);
        context.report({ node, messageId: 'barrel', data: { specifier, name } });
      },
    };
  },
});
