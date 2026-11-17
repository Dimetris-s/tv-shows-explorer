import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const USAGE = `Usage: pnpm gen:task <path> [options]

Creates a task by Simple Architecture rules (docs/architecture/tasks.md).

  <path>          task path inside a tasks/ folder, the last segment is a camelCase verb:
                    src/app/ShowSearch/logic/tasks/searchShows   task of one component
                    src/app/ShowSearch/tasks/searchShows         shared inside a widget
                    src/tasks/searchShows                        shared across the app
  --folder        create a folder task: <verb>/<verb>.ts and <verb>/index.ts (re-export only)
  -h, --help      show this help`;

const fail = (message: string): never => {
  console.error(`✖ ${message}\n\n${USAGE}`);
  process.exit(1);
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    folder: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.warn(USAGE);
  process.exit(0);
}

const [target] = positionals;
if (!target || positionals.length > 1) fail('Expected exactly one task path.');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const taskPath = path.resolve(root, target ?? '');
const name = path.basename(taskPath);
const tasksDir = path.dirname(taskPath);
const ownerDir = path.dirname(tasksDir);

const isComponentDir = (dir: string) =>
  fs.existsSync(
    path.join(dir, `${dir === path.join(srcDir, 'app') ? 'App' : path.basename(dir)}.tsx`),
  );

if (!taskPath.startsWith(srcDir + path.sep)) fail(`Task must live inside src/: ${target}`);
if (path.basename(tasksDir) !== 'tasks') fail('A task lives directly in a tasks/ folder.');
if (!/^[a-z][A-Za-z0-9]*$/.test(name) || /^use[A-Z]/.test(name)) {
  fail(`Task name must be a camelCase verb, not a hook: ${name}`);
}

const isLogicTasks = path.basename(ownerDir) === 'logic';
const isValidOwner = isLogicTasks
  ? isComponentDir(path.dirname(ownerDir))
  : ownerDir === srcDir || isComponentDir(ownerDir);
if (!isValidOwner) {
  fail('tasks/ belongs to a component (<Name>/logic/tasks, <Widget>/tasks) or to src/tasks.');
}
if (fs.existsSync(taskPath) || fs.existsSync(`${taskPath}.ts`))
  fail(`Task already exists: ${target}`);

const taskFile = `export const ${name} = () => {
  throw new Error('${name}: not implemented');
};
`;

const files: Record<string, string> = values.folder
  ? {
      [path.join(taskPath, `${name}.ts`)]: taskFile,
      [path.join(taskPath, 'index.ts')]: `export { ${name} } from './${name}';\n`,
    }
  : { [`${taskPath}.ts`]: taskFile };

for (const [file, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const written = Object.keys(files);
execFileSync('pnpm', ['exec', 'vp', 'fmt', ...written], { stdio: 'ignore' });

console.warn(`✔ task ${name} created`);
for (const file of written) console.warn(`  ${path.relative(root, file)}`);
