import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { componentNameOf, isComponentDir, LOGIC_DIR, srcRootOf } from '../paths.ts';

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;
const PRESENTER_FILE = /^use[A-Za-z0-9]*Presenter\.ts$/;
const TYPES_FILE = /\.types\.ts$/;
const TEST_FILE = /\.test\.tsx?$/;
const LOWERCASE_DIRS = ['logic', 'tasks', 'hooks', 'types', 'components'];

const miscasedDirOf = (filename: string, cwd: string) =>
  path
    .relative(srcRootOf(cwd), path.dirname(filename))
    .split(path.sep)
    .find((dir) => LOWERCASE_DIRS.includes(dir.toLowerCase()) && !LOWERCASE_DIRS.includes(dir));

export const fileNaming = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Component files are named after their folder.' },
    messages: {
      componentFolder:
        'Компонент `{{file}}` должен лежать в одноимённой папке: `{{name}}/{{name}}.tsx` (сейчас папка `{{dir}}`).',
      pascalCase: 'Имя компонента `{{name}}` должно быть в PascalCase.',
      presenterName:
        'Презентер в папке `{{dir}}` должен называться `use{{name}}Presenter.ts`, а не `{{file}}`.',
      presenterPlace: 'Презентер `{{file}}` должен лежать в `logic/` своего компонента.',
      typesName: 'Файл типов в папке `{{dir}}` должен называться `{{name}}.types.ts`.',
      orphan: '`{{file}}` относится к компоненту, но рядом нет `{{name}}.tsx`.',
      viewInLogic: '`{{file}}`: в `logic/` нет отображения, компоненты лежат в своих папках.',
      lowercaseDir: 'Служебная папка `{{dir}}` пишется строчными: `{{lower}}`.',
    },
  },
  createOnce(context) {
    return {
      Program(node) {
        const { filename, cwd } = context;
        const file = path.basename(filename);
        const dirPath = path.dirname(filename);
        const dir = path.basename(dirPath);
        const data = { file, dir, name: componentNameOf(dirPath, cwd) };

        const miscased = miscasedDirOf(filename, cwd);
        if (miscased) {
          context.report({
            node,
            messageId: 'lowercaseDir',
            data: { dir: miscased, lower: miscased.toLowerCase() },
          });
          return;
        }

        if (TEST_FILE.test(file)) return;

        if (file.endsWith('.tsx')) {
          const stem = file.slice(0, -'.tsx'.length);
          if (dir === LOGIC_DIR) {
            context.report({ node, messageId: 'viewInLogic', data });
          } else if (!PASCAL_CASE.test(stem)) {
            context.report({ node, messageId: 'pascalCase', data: { name: stem } });
          } else if (stem !== data.name) {
            context.report({ node, messageId: 'componentFolder', data: { ...data, name: stem } });
          }
          return;
        }

        if (PRESENTER_FILE.test(file)) {
          const ownerDir = path.dirname(dirPath);
          const owner = componentNameOf(ownerDir, cwd);
          const ownerData = { file, dir: path.basename(ownerDir), name: owner };
          if (dir !== LOGIC_DIR) {
            context.report({ node, messageId: 'presenterPlace', data });
          } else if (!isComponentDir(ownerDir, cwd)) {
            context.report({ node, messageId: 'orphan', data: ownerData });
          } else if (file !== `use${owner}Presenter.ts`) {
            context.report({ node, messageId: 'presenterName', data: ownerData });
          }
          return;
        }

        if (!TYPES_FILE.test(file)) return;

        if (!isComponentDir(dirPath, cwd)) {
          context.report({ node, messageId: 'orphan', data });
        } else if (file !== `${data.name}.types.ts`) {
          context.report({ node, messageId: 'typesName', data });
        }
      },
    };
  },
});
