import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import {
  isInside,
  LOGIC_DIR,
  ownerOfSegment,
  resolveSpecifier,
  SCOPED_DIRS,
  TASKS_DIR,
} from '../paths.ts';

const PRESENTER_MODULE = /^use[A-Za-z0-9]*Presenter$/;

const scopeViolation = (resolved: string, filename: string) => {
  for (const segment of SCOPED_DIRS) {
    const owner = ownerOfSegment(resolved, segment);
    if (owner !== null && !isInside(filename, owner)) return owner;
  }
  return null;
};

export const logicScope = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'logic/ is private to its component; shared folders to their subtree.' },
    messages: {
      privateLogic:
        '`{{specifier}}` лежит в приватной `logic/` компонента `{{owner}}`. Её импортирует только сам компонент. Общий код вынеси в `tasks/` (или `src/hooks/`) ближайшего общего предка.',
      scoped:
        '`{{specifier}}` виден только внутри `{{scope}}/`. Нужен снаружи — вынеси в общего предка или на глобальный уровень `src/`.',
      viewTasks:
        'View не вызывает таски (`{{specifier}}`). Вызови таску в презентере и отдай View результат.',
      viewLogic:
        'View импортирует из `logic/` только свой презентер, а не `{{specifier}}`. Остальное отдаёт презентер.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const specifier = node.source.value;
        const resolved = resolveSpecifier(specifier, filename, cwd);
        if (!resolved) return;

        const isView = filename.endsWith('.tsx');
        if (isView && ownerOfSegment(resolved, TASKS_DIR) !== null) {
          context.report({ node, messageId: 'viewTasks', data: { specifier } });
          return;
        }

        const logicOwner = ownerOfSegment(resolved, LOGIC_DIR);
        if (logicOwner !== null) {
          const importerDir = path.dirname(filename);
          const allowed =
            importerDir === logicOwner || isInside(filename, path.join(logicOwner, LOGIC_DIR));
          if (!allowed) {
            const owner = path.basename(logicOwner);
            context.report({ node, messageId: 'privateLogic', data: { specifier, owner } });
            return;
          }
          if (isView && !PRESENTER_MODULE.test(path.basename(resolved))) {
            context.report({ node, messageId: 'viewLogic', data: { specifier } });
          }
          return;
        }

        const scope = scopeViolation(resolved, filename);
        if (scope) {
          context.report({
            node,
            messageId: 'scoped',
            data: { specifier, scope: path.relative(cwd, scope) },
          });
        }
      },
    };
  },
});
