export type ComponentOptions = {
  name: string;
  presenter: boolean;
  props: boolean;
  styles: boolean;
  test: boolean;
  wrap: string | undefined;
};

const typesFile = ({ name, wrap }: ComponentOptions) =>
  wrap
    ? `import type { ComponentProps } from 'react';

import type { ${name} as Ui${name} } from '@/components/ui/${wrap}';

export type ${name}Props = ComponentProps<typeof Ui${name}>;
`
    : `export type ${name}Props = {
  title: string;
};
`;

const presenterFile = ({ name, props }: ComponentOptions) =>
  props
    ? `import type { ${name}Props } from './${name}.types';

export const use${name}Presenter = ({ title }: ${name}Props) => {
  return { title };
};
`
    : `export const use${name}Presenter = () => {
  return { title: '${name}' };
};
`;

const wrapperComponent = ({
  name,
  wrap,
}: ComponentOptions) => `import { ${name} as Ui${name} } from '@/components/ui/${wrap}';

import type { ${name}Props } from './${name}.types';

export const ${name} = (props: ${name}Props) => <Ui${name} {...props} />;
`;

const componentFile = (options: ComponentOptions) => {
  const { name, presenter, props, styles } = options;
  if (options.wrap) return wrapperComponent(options);

  const imports = [
    styles ? `import styles from './${name}.module.css';` : '',
    props ? `import type { ${name}Props } from './${name}.types';` : '',
    presenter ? `import { use${name}Presenter } from './use${name}Presenter';` : '',
  ].filter(Boolean);

  const params = props ? (presenter ? `props: ${name}Props` : `{ title }: ${name}Props`) : '';
  const body = presenter
    ? `  const { title } = use${name}Presenter(${props ? 'props' : ''});\n\n`
    : '';
  const className = styles ? ' className={styles.root}' : '';
  const content = presenter || props ? '{title}' : name;

  return `${imports.join('\n')}${imports.length ? '\n\n' : ''}export const ${name} = (${params}) => {
${body}  return <div${className}>${content}</div>;
};
`;
};

const barrelFile = ({ name, props, wrap }: ComponentOptions) =>
  `export { ${name} } from './${name}';
${props || wrap ? `export type { ${name}Props } from './${name}.types';\n` : ''}`;

const stylesFile = () => `.root {
  display: block;
}
`;

const testFile = ({
  name,
}: ComponentOptions) => `import { describe, expect, it } from 'vite-plus/test';

import { ${name} } from './${name}';

describe('${name}', () => {
  it('is a component', () => {
    expect(${name}).toBeTypeOf('function');
  });
});
`;

export const renderFiles = (options: ComponentOptions) => {
  const { name } = options;
  const hasTypes = options.props || Boolean(options.wrap);
  const files: Record<string, string> = {
    [`${name}.tsx`]: componentFile(options),
    'index.ts': barrelFile(options),
  };
  if (hasTypes) files[`${name}.types.ts`] = typesFile(options);
  if (options.presenter) files[`use${name}Presenter.ts`] = presenterFile(options);
  if (options.styles) files[`${name}.module.css`] = stylesFile();
  if (options.test) files[`${name}.test.tsx`] = testFile(options);
  return files;
};
