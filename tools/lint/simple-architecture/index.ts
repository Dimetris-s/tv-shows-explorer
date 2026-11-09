import { definePlugin } from 'vite-plus/lint/plugins';

import { encapsulatedImports } from './rules/encapsulatedImports.ts';
import { fileNaming } from './rules/fileNaming.ts';
import { presenterUsage } from './rules/presenterUsage.ts';
import { pureView } from './rules/pureView.ts';

const plugin = definePlugin({
  meta: { name: 'simple-architecture' },
  rules: {
    'file-naming': fileNaming,
    'presenter-usage': presenterUsage,
    'pure-view': pureView,
    'encapsulated-imports': encapsulatedImports,
  },
});

export default plugin;
