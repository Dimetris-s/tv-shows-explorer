import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

import { renderFiles } from './templates.ts';

const USAGE = `Usage: pnpm gen:component <path> [options]

Creates a component folder by Simple Architecture rules (docs/architecture/structure.md).

  <path>               component folder, e.g. src/app/ShowList/ShowCard or src/components/Alert
  --presenter          add use<Name>Presenter.ts
  --props              add <Name>.types.ts with <Name>Props (shared by component and presenter)
  --styles             add <Name>.module.css
  --test               add <Name>.test.tsx
  --wrap <ui-file>     wrap a shadcn primitive from src/components/ui/<ui-file>.tsx
                       (component name must match the primitive's export name)
  -h, --help           show this help`;

const fail = (message: string): never => {
  console.error(`✖ ${message}\n\n${USAGE}`);
  process.exit(1);
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    presenter: { type: 'boolean', default: false },
    props: { type: 'boolean', default: false },
    styles: { type: 'boolean', default: false },
    test: { type: 'boolean', default: false },
    wrap: { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.warn(USAGE);
  process.exit(0);
}

const [target] = positionals;
if (!target || positionals.length > 1) fail('Expected exactly one component path.');

const root = process.cwd();
const dir = path.resolve(root, target ?? '');
const srcDir = path.join(root, 'src');
const isApp = dir === path.join(srcDir, 'app');
const name = isApp ? 'App' : path.basename(dir);

if (!dir.startsWith(srcDir + path.sep)) fail(`Component must live inside src/: ${target}`);
if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) fail(`Component folder must be PascalCase: ${name}`);
if (fs.existsSync(path.join(dir, `${name}.tsx`))) fail(`Component already exists: ${target}`);

const wrap = values.wrap;
if (wrap) {
  const uiFile = path.join(srcDir, 'components', 'ui', `${wrap}.tsx`);
  if (!fs.existsSync(uiFile)) fail(`shadcn primitive not found: src/components/ui/${wrap}.tsx`);
  if (path.dirname(dir) !== path.join(srcDir, 'components')) {
    fail('Wrappers of shadcn primitives live directly in src/components/<Name>.');
  }
  if (values.presenter || values.styles)
    fail('--wrap cannot be combined with --presenter/--styles.');
}

const files = renderFiles({ ...values, name, wrap });

fs.mkdirSync(dir, { recursive: true });
const written = Object.entries(files).map(([file, content]) => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) fail(`File already exists: ${path.relative(root, filePath)}`);
  fs.writeFileSync(filePath, content);
  return filePath;
});

execFileSync('pnpm', ['exec', 'vp', 'fmt', ...written], { stdio: 'ignore' });

console.warn(`✔ ${name} created in ${path.relative(root, dir)}/`);
for (const file of written) console.warn(`  ${path.relative(root, file)}`);
