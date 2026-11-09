import type { TypographyProps } from './Typography.types';
import { useTypographyPresenter } from './useTypographyPresenter';

export const Typography = (props: TypographyProps) => {
  const { Tag, className, children } = useTypographyPresenter(props);

  return <Tag className={className}>{children}</Tag>;
};
