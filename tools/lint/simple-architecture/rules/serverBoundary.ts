import { defineRule } from 'vite-plus/lint/plugins';

import { isInside, resolveSpecifier, serverRootOf } from '../paths.ts';

const SERVER_PACKAGE = '@tv/server';
const CONTRACT = `${SERVER_PACKAGE}/contract`;

const isServerPackage = (specifier: string) =>
  specifier === SERVER_PACKAGE || specifier.startsWith(`${SERVER_PACKAGE}/`);

export const serverBoundary = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'The client sees the server only through type imports of its contract.' },
    messages: {
      publicApi: 'Из сервера доступен только `{{contract}}`, а не `{{specifier}}`.',
      typeOnly:
        'Контракт сервера импортируется только как `import type { … } from {{contract}}`: серверный код не попадает в бандл.',
      relative:
        'Импорт `{{specifier}}` ведёт в `server/` мимо публичного API. Используй `import type` из `{{contract}}`.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const specifier = node.source.value;
        const data = { specifier, contract: CONTRACT };
        if (isServerPackage(specifier)) {
          if (specifier !== CONTRACT) context.report({ node, messageId: 'publicApi', data });
          else if (node.importKind !== 'type')
            context.report({ node, messageId: 'typeOnly', data });
          return;
        }
        const resolved = resolveSpecifier(specifier, filename, cwd);
        if (resolved && isInside(resolved, serverRootOf(cwd))) {
          context.report({ node, messageId: 'relative', data });
        }
      },
    };
  },
});
