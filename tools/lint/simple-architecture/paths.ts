import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.join('src', 'app');

export const srcRootOf = (cwd: string) => path.join(cwd, 'src');

export const serverRootOf = (cwd: string) => path.join(cwd, 'server');

export const serverSrcOf = (cwd: string) => path.join(serverRootOf(cwd), 'src');

export const isInside = (file: string, dir: string) => file.startsWith(dir + path.sep);

export const componentNameOf = (dir: string, cwd: string) =>
  dir === path.join(cwd, APP_DIR) ? 'App' : path.basename(dir);

export const isComponentDir = (dir: string, cwd: string) =>
  fs.existsSync(path.join(dir, `${componentNameOf(dir, cwd)}.tsx`));

export const resolveSpecifier = (specifier: string, filename: string, cwd: string) => {
  if (specifier.startsWith('@/')) return path.join(srcRootOf(cwd), specifier.slice(2));
  if (specifier.startsWith('#/')) return path.join(serverSrcOf(cwd), specifier.slice(2));
  if (specifier.startsWith('.')) return path.resolve(path.dirname(filename), specifier);
  return null;
};

export const LOGIC_DIR = 'logic';
export const TASKS_DIR = 'tasks';
export const SCOPED_DIRS = ['components', 'tasks', 'types'];

const segmentsOf = (file: string) => file.split(path.sep);

export const ownerOfSegment = (file: string, segment: string) => {
  const parts = segmentsOf(file);
  const index = parts.lastIndexOf(segment);
  return index > 0 ? parts.slice(0, index).join(path.sep) : null;
};

export const logicOwnerOf = (file: string) => ownerOfSegment(path.dirname(file), LOGIC_DIR);

export const tasksDirOf = (file: string) => {
  const owner = ownerOfSegment(path.dirname(file), TASKS_DIR);
  return owner === null ? null : path.join(owner, TASKS_DIR);
};

export const presenterOwnerDir = (presenterDir: string) =>
  path.basename(presenterDir) === LOGIC_DIR ? path.dirname(presenterDir) : presenterDir;
