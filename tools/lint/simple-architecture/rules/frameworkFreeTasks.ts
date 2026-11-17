import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';

import { isComponentDir, isInside, resolveSpecifier, srcRootOf } from '../paths.ts';

const REACT_PACKAGE = /^(react|react-dom)(\/|$)|^react-/;
const HOOK_MODULE = /^use[A-Z]/;

const forbiddenReason = (specifier: string, resolved: string | null, cwd: string) => {
  if (REACT_PACKAGE.test(specifier)) return 'React';
  if (!resolved) return null;
  const srcRoot = srcRootOf(cwd);
  if (isInside(resolved, path.join(srcRoot, 'components'))) return 'компоненты';
  if (isInside(resolved, path.join(srcRoot, 'hooks'))) return 'хуки';
  if (resolved.endsWith('.tsx') || isComponentDir(resolved, cwd)) return 'компоненты';
  if (HOOK_MODULE.test(path.basename(resolved))) return 'хуки';
  return null;
};

export const frameworkFreeTasks = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Tasks are plain functions independent of React.' },
    messages: {
      forbidden:
        'Таска не зависит от React: импорт `{{specifier}}` ({{reason}}) запрещён. Связь с React — работа презентера.',
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        const { filename, cwd } = context;
        const specifier = node.source.value;
        const reason = forbiddenReason(specifier, resolveSpecifier(specifier, filename, cwd), cwd);
        if (reason) context.report({ node, messageId: 'forbidden', data: { specifier, reason } });
      },
    };
  },
});
