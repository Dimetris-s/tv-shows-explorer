import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { isInside, resolveSpecifier, srcRootOf, TASKS_DIR } from '../paths.ts';

const FORBIDDEN: Record<string, string[]> = {
  types: ['app', 'components', 'hooks', 'tasks', 'stores', 'services', 'lib'],
  lib: ['app', 'components', 'hooks', 'tasks', 'stores', 'services'],
  stores: ['app', 'components', 'hooks', 'tasks', 'services'],
  services: ['app', 'components', 'hooks', 'tasks', 'stores'],
  tasks: ['app', 'components', 'hooks'],
  hooks: ['app', 'components'],
};

const VIEW_FORBIDDEN = ['stores', 'services'];

const layerOf = (file: string, srcRoot: string) =>
  isInside(file, srcRoot) ? path.relative(srcRoot, file).split(path.sep)[0] : undefined;

const isTask = (file: string, srcRoot: string) =>
  path.relative(srcRoot, file).split(path.sep).includes(TASKS_DIR);

const isView = (file: string, srcRoot: string) =>
  file.endsWith('.tsx') &&
  layerOf(file, srcRoot) !== 'main.tsx' &&
  !isInside(file, path.join(srcRoot, 'components', 'ui'));

export const frontLayers = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Client dependencies point from the view towards business logic.' },
    messages: {
      layer:
        '`{{own}}/` не зависит от `{{layer}}/`. Зависимости направлены от отображения к бизнес-логике: компоненты → презентеры → таски → сторы, а `services/`, `lib/` и `types/` ничего не знают о приложении.',
      view: 'View не импортирует `{{target}}`: данные и обработчики готовит презентер.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const srcRoot = srcRootOf(cwd);
        const resolved = resolveSpecifier(node.source.value, filename, cwd);
        if (!resolved) return;
        const own = layerOf(filename, srcRoot);
        const layer = layerOf(resolved, srcRoot);
        if (!own || !layer) return;

        if (FORBIDDEN[own]?.includes(layer)) {
          context.report({ node, messageId: 'layer', data: { own, layer } });
          return;
        }
        if (!isView(filename, srcRoot)) return;
        if (VIEW_FORBIDDEN.includes(layer)) {
          context.report({ node, messageId: 'view', data: { target: `${layer}/` } });
        } else if (isTask(resolved, srcRoot)) {
          context.report({ node, messageId: 'view', data: { target: 'таски' } });
        }
      },
    };
  },
});
