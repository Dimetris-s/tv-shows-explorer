import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { componentNameOf, isComponentDir } from '../paths.ts';

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;
const PRESENTER_FILE = /^use[A-Za-z0-9]*Presenter\.ts$/;
const TYPES_FILE = /\.types\.ts$/;
const TEST_FILE = /\.test\.tsx?$/;

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
      typesName: 'Файл типов в папке `{{dir}}` должен называться `{{name}}.types.ts`.',
      orphan: '`{{file}}` относится к компоненту, но рядом нет `{{name}}.tsx`.',
    },
  },
  createOnce(context) {
    return {
      Program(node) {
        const { filename, cwd } = context;
        const file = path.basename(filename);
        const dirPath = path.dirname(filename);
        const dir = path.basename(dirPath);
        const name = componentNameOf(dirPath, cwd);
        const data = { file, dir, name };

        if (TEST_FILE.test(file)) return;

        if (file.endsWith('.tsx')) {
          const stem = file.slice(0, -'.tsx'.length);
          if (!PASCAL_CASE.test(stem)) {
            context.report({ node, messageId: 'pascalCase', data: { name: stem } });
          } else if (stem !== name) {
            context.report({ node, messageId: 'componentFolder', data: { ...data, name: stem } });
          }
          return;
        }

        const isPresenter = PRESENTER_FILE.test(file);
        const isTypes = TYPES_FILE.test(file);
        if (!isPresenter && !isTypes) return;

        if (!isComponentDir(dirPath, cwd)) {
          context.report({ node, messageId: 'orphan', data });
        } else if (isPresenter && file !== `use${name}Presenter.ts`) {
          context.report({ node, messageId: 'presenterName', data });
        } else if (isTypes && file !== `${name}.types.ts`) {
          context.report({ node, messageId: 'typesName', data });
        }
      },
    };
  },
});
