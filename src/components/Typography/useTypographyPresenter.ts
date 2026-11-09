import { cn } from '@/lib/utils';

import type { TypographyProps } from './Typography.types';
import { defaultTags, typographyVariants } from './typographyVariants';

export const useTypographyPresenter = ({
  children,
  variant = 'body',
  tone = 'default',
  as,
  className,
}: TypographyProps) => ({
  Tag: as ?? defaultTags[variant],
  className: cn(typographyVariants({ variant, tone }), className),
  children,
});
