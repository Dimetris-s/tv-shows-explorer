import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.join('src', 'app');

export const srcRootOf = (cwd: string) => path.join(cwd, 'src');

export const isInside = (file: string, dir: string) => file.startsWith(dir + path.sep);

export const componentNameOf = (dir: string, cwd: string) =>
  dir === path.join(cwd, APP_DIR) ? 'App' : path.basename(dir);

export const isComponentDir = (dir: string, cwd: string) =>
  fs.existsSync(path.join(dir, `${componentNameOf(dir, cwd)}.tsx`));

export const resolveSpecifier = (specifier: string, filename: string, cwd: string) => {
  if (specifier.startsWith('@/')) return path.join(srcRootOf(cwd), specifier.slice(2));
  if (specifier.startsWith('.')) return path.resolve(path.dirname(filename), specifier);
  return null;
};
