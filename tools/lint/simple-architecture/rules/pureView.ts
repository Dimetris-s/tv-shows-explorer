import path from 'node:path';

import { defineRule } from 'vite-plus/lint/plugins';
import type { Context, ESTree } from 'vite-plus/lint/plugins';

import { componentNameOf } from '../paths.ts';

const HOOK_CALL = /^use[A-Z]/;

const isEarlyReturn = (node: ESTree.IfStatement) => {
  if (node.alternate) return false;
  const { consequent } = node;
  if (consequent.type === 'ReturnStatement') return true;
  return (
    consequent.type === 'BlockStatement' &&
    consequent.body.length === 1 &&
    consequent.body[0]?.type === 'ReturnStatement'
  );
};

const isPresenterCall = (declarator: ESTree.VariableDeclarator, presenter: string) =>
  declarator.id.type === 'ObjectPattern' &&
  declarator.init?.type === 'CallExpression' &&
  declarator.init.callee.type === 'Identifier' &&
  declarator.init.callee.name === presenter;

const checkBody = (context: Context, body: ESTree.FunctionBody, presenter: string) => {
  for (const statement of body.body) {
    if (statement.type === 'ReturnStatement') continue;
    if (statement.type === 'IfStatement') {
      if (!isEarlyReturn(statement)) context.report({ node: statement, messageId: 'earlyReturn' });
      continue;
    }
    if (statement.type === 'VariableDeclaration') {
      for (const declarator of statement.declarations) {
        if (!isPresenterCall(declarator, presenter)) {
          context.report({ node: declarator, messageId: 'onlyPresenter', data: { presenter } });
        }
      }
      continue;
    }
    context.report({ node: statement, messageId: 'logic' });
  }
};

const componentFunction = (statement: ESTree.Statement | ESTree.Directive, name: string) => {
  if (statement.type !== 'ExportNamedDeclaration') return null;
  const declaration = statement.declaration;
  if (declaration?.type !== 'VariableDeclaration') return null;
  const [declarator] = declaration.declarations;
  if (declarator?.id.type !== 'Identifier' || declarator.id.name !== name) return null;
  return declarator.init?.type === 'ArrowFunctionExpression' ? declarator.init : null;
};

export const pureView = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'A component is View only: presenter call, early return and JSX.' },
    messages: {
      topLevel:
        'В файле компонента допустимы только импорты и `export const {{name}} = (…) => …`. Вынеси остальное в презентер, утилиту или `{{name}}.types.ts`.',
      onlyPresenter:
        'В теле компонента допустим только `const { … } = {{presenter}}(…)`. Логику, данные и обработчики готовит презентер.',
      earlyReturn: 'В компоненте допустим только ранний `if (…) return …;` без `else`.',
      logic: 'В компоненте нет логики: только вызов презентера, ранний return и JSX.',
      hook: 'Хук `{{hook}}` нельзя вызывать в компоненте. Хуки вызываются в презентере.',
      inlineHandler:
        'Инлайн-функция в атрибуте `{{attribute}}`. Презентер отдаёт готовый обработчик или фабрику: `{{attribute}}={handleX(id)}`.',
    },
  },
  createOnce(context) {
    let isComponentFile = false;
    let presenter = '';

    return {
      Program(node) {
        const { filename, cwd } = context;
        const name = componentNameOf(path.dirname(filename), cwd);
        isComponentFile = path.basename(filename) === `${name}.tsx`;
        presenter = `use${name}Presenter`;
        if (!isComponentFile) return;

        for (const statement of node.body) {
          if (statement.type === 'ImportDeclaration') continue;
          const component = componentFunction(statement, name);
          if (!component) {
            context.report({ node: statement, messageId: 'topLevel', data: { name } });
          } else if (component.body.type === 'BlockStatement') {
            checkBody(context, component.body, presenter);
          }
        }
      },
      CallExpression(node) {
        if (!isComponentFile || node.callee.type !== 'Identifier') return;
        const hook = node.callee.name;
        if (HOOK_CALL.test(hook) && hook !== presenter) {
          context.report({ node, messageId: 'hook', data: { hook } });
        }
      },
      JSXAttribute(node) {
        if (!isComponentFile || node.value?.type !== 'JSXExpressionContainer') return;
        const { type } = node.value.expression;
        if (type === 'ArrowFunctionExpression' || type === 'FunctionExpression') {
          const attribute = node.name.type === 'JSXIdentifier' ? node.name.name : 'attribute';
          context.report({ node, messageId: 'inlineHandler', data: { attribute } });
        }
      },
    };
  },
});
