import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { isInside, resolveSpecifier, serverSrcOf } from '../paths.ts';

const FORBIDDEN: Record<string, string[]> = {
  routes: ['stores', 'services'],
  tasks: ['routes'],
  contract: ['routes', 'tasks', 'stores', 'services'],
  stores: ['routes', 'tasks', 'services', 'contract'],
  types: ['routes', 'tasks', 'stores', 'services', 'contract'],
};

const MESSAGE_OF: Record<string, 'routes' | 'tasks' | 'inner'> = {
  routes: 'routes',
  tasks: 'tasks',
};

const layerOf = (file: string, serverSrc: string) =>
  isInside(file, serverSrc) ? path.relative(serverSrc, file).split(path.sep)[0] : undefined;

export const serverLayers = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Server dependencies point inward: routes → tasks → stores → types.' },
    messages: {
      routes:
        'Роут не обращается к `{{layer}}/` напрямую: вызови таску. Роут только разбирает запрос и отдаёт ответ.',
      tasks: 'Таска не импортирует роуты: зависимость направлена от роута к таске.',
      inner:
        '`{{own}}/` стабильнее, чем `{{layer}}/`, и не зависит от него. Зависимости направлены внутрь: роуты → таски → сторы → доменные типы (`types/`).',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const serverSrc = serverSrcOf(cwd);
        const own = layerOf(filename, serverSrc);
        const forbidden = own ? FORBIDDEN[own] : undefined;
        if (!own || !forbidden) return;
        const resolved = resolveSpecifier(node.source.value, filename, cwd);
        const layer = resolved ? layerOf(resolved, serverSrc) : undefined;
        if (layer && forbidden.includes(layer)) {
          context.report({ node, messageId: MESSAGE_OF[own] ?? 'inner', data: { own, layer } });
        }
      },
    };
  },
});
