import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, lazyPlugins } from 'vite-plus';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  fmt: {
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    printWidth: 100,
    ignorePatterns: ['pnpm-lock.yaml'],
  },
  lint: {
    plugins: ['eslint', 'react', 'typescript', 'oxc', 'import'],
    categories: {
      correctness: 'error',
      suspicious: 'warn',
    },
    rules: {
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'warn',
      'react/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',

      'typescript/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'typescript/no-explicit-any': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/no-misused-promises': 'error',

      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }],

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    overrides: [
      {
        // shadcn-generated components export variants alongside components
        files: ['src/components/ui/**'],
        rules: {
          'react/only-export-components': 'off',
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
});
