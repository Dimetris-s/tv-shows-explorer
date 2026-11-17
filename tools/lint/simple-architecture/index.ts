import { definePlugin } from 'vite-plus/lint/plugins';

import { encapsulatedImports } from './rules/encapsulatedImports.ts';
import { fileNaming } from './rules/fileNaming.ts';
import { frameworkFreeTasks } from './rules/frameworkFreeTasks.ts';
import { logicScope } from './rules/logicScope.ts';
import { presenterUsage } from './rules/presenterUsage.ts';
import { pureView } from './rules/pureView.ts';
import { taskShape } from './rules/taskShape.ts';

const plugin = definePlugin({
  meta: { name: 'simple-architecture' },
  rules: {
    'file-naming': fileNaming,
    'presenter-usage': presenterUsage,
    'pure-view': pureView,
    'encapsulated-imports': encapsulatedImports,
    'logic-scope': logicScope,
    'framework-free-tasks': frameworkFreeTasks,
    'task-shape': taskShape,
  },
});

export default plugin;
