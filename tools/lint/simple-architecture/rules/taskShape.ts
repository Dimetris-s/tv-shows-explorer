import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';
import type { ESTree } from 'vite-plus/lint/plugins';

import { tasksDirOf } from '../paths.ts';

const CAMEL_CASE = /^[a-z][A-Za-z0-9]*$/;
const HOOK_NAME = /^use[A-Z]/;

type Statement = ESTree.Statement | ESTree.Directive | ESTree.ModuleDeclaration;

const valueExportsOf = (body: Statement[]) =>
  body.flatMap((statement) => {
    if (statement.type === 'ExportDefaultDeclaration') return ['default'];
    if (statement.type !== 'ExportNamedDeclaration' || statement.exportKind === 'type') return [];
    const { declaration } = statement;
    if (declaration?.type === 'VariableDeclaration') {
      return declaration.declarations.flatMap((d) =>
        d.id.type === 'Identifier' ? [d.id.name] : [],
      );
    }
    if (declaration?.type === 'FunctionDeclaration' && declaration.id) return [declaration.id.name];
    if (declaration) return [];
    return statement.specifiers.flatMap((s) =>
      s.exportKind === 'type'
        ? []
        : [s.exported.type === 'Identifier' ? s.exported.name : s.exported.value],
    );
  });

const isReexportOnly = (body: Statement[]) =>
  body.every(
    (statement) => statement.type === 'ExportNamedDeclaration' && statement.source !== null,
  );

export const taskShape = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'A task file exports one function named after the file.' },
    messages: {
      noBarrel: 'У папки `tasks/` нет barrel: таски импортируются напрямую (`…/tasks/verbName`).',
      tsx: 'Таска — это `.ts`, а не `.tsx`.',
      camelCase: 'Имя таски `{{name}}` должно быть глаголом в camelCase и не начинаться с `use`.',
      single:
        'В файле таски `{{file}}` должен быть один экспорт функции `{{name}}` (сейчас: {{found}}). Части таски вынеси в соседние файлы её папки.',
      reexport:
        "`index.ts` таски `{{name}}` — только точка входа: `export { {{name}} } from './{{name}}';`.",
    },
  },
  createOnce(context) {
    return {
      Program(node) {
        const { filename } = context;
        const tasksDir = tasksDirOf(filename);
        if (!tasksDir || /\.test\.tsx?$/.test(filename)) return;

        const relative = path.relative(tasksDir, filename).split(path.sep);
        const file = path.basename(filename);
        const [first] = relative;
        if (!first) return;
        if (file.endsWith('.tsx')) {
          context.report({ node, messageId: 'tsx' });
          return;
        }
        if (relative.length === 1 && file === 'index.ts') {
          context.report({ node, messageId: 'noBarrel' });
          return;
        }

        const name = relative.length === 1 ? file.slice(0, -'.ts'.length) : first;
        if (!CAMEL_CASE.test(name) || HOOK_NAME.test(name)) {
          context.report({ node, messageId: 'camelCase', data: { name } });
          return;
        }

        const isFolderTask = relative.length > 1;
        if (isFolderTask && relative.length === 2 && file === 'index.ts') {
          const exports = valueExportsOf(node.body);
          if (!isReexportOnly(node.body) || exports.join() !== name) {
            context.report({ node, messageId: 'reexport', data: { name } });
          }
          return;
        }
        if (isFolderTask && !(relative.length === 2 && file === `${name}.ts`)) return;

        const exports = valueExportsOf(node.body);
        if (exports.length !== 1 || exports[0] !== name) {
          const found = exports.length ? exports.map((e) => `\`${e}\``).join(', ') : 'нет';
          context.report({ node, messageId: 'single', data: { file, name, found } });
        }
      },
    };
  },
});
