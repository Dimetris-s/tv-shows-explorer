import { definePlugin } from 'vite-plus/lint/plugins';

import { encapsulatedImports } from './rules/encapsulatedImports.ts';
import { fileNaming } from './rules/fileNaming.ts';
import { frontLayers } from './rules/frontLayers.ts';
import { frameworkFreeTasks } from './rules/frameworkFreeTasks.ts';
import { logicScope } from './rules/logicScope.ts';
import { presenterUsage } from './rules/presenterUsage.ts';
import { pureView } from './rules/pureView.ts';
import { serverBoundary } from './rules/serverBoundary.ts';
import { serverLayers } from './rules/serverLayers.ts';
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
    'front-layers': frontLayers,
    'task-shape': taskShape,
    'server-boundary': serverBoundary,
    'server-layers': serverLayers,
  },
});

export default plugin;
