import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { componentNameOf, resolveSpecifier } from '../paths.ts';

const PRESENTER_MODULE = /^use[A-Za-z0-9]*Presenter$/;

export const presenterUsage = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'A presenter is used only by its own component.' },
    messages: {
      foreign:
        'Презентер `{{presenter}}` принадлежит компоненту `{{owner}}` и импортируется только из `{{owner}}.tsx` в той же папке.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const specifier = node.source.value;
        const resolved = resolveSpecifier(specifier, filename, cwd);
        if (!resolved) return;

        const presenter = path.basename(resolved);
        if (!PRESENTER_MODULE.test(presenter)) return;

        const presenterDir = path.dirname(resolved);
        const owner = componentNameOf(presenterDir, cwd);
        const isOwner =
          path.dirname(filename) === presenterDir && path.basename(filename) === `${owner}.tsx`;

        if (!isOwner) {
          context.report({ node, messageId: 'foreign', data: { presenter, owner } });
        }
      },
    };
  },
});
