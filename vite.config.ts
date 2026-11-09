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
        // Simple Architecture: docs/architecture/enforcement.md
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        rules: {
          'max-lines': ['error', { max: 120, skipBlankLines: true, skipComments: true }],
          'import/no-default-export': 'error',
          'simple-architecture/file-naming': 'error',
          'simple-architecture/presenter-usage': 'error',
          'simple-architecture/pure-view': 'error',
          'simple-architecture/encapsulated-imports': 'error',
        },
      },
      {
        // Entry point mounts App and is not a component
        files: ['src/main.tsx'],
        rules: {
          'simple-architecture/file-naming': 'off',
          'simple-architecture/pure-view': 'off',
        },
      },
      {
        // shadcn/ui vendor code: generated, exempt from architecture rules
        files: ['src/components/ui/**'],
        rules: {
          'react/only-export-components': 'off',
          'max-lines': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
          'simple-architecture/file-naming': 'off',
          'simple-architecture/pure-view': 'off',
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
      {
        name: 'simple-architecture',
        specifier: './tools/lint/simple-architecture/index.ts',
      },
    ],
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
});
