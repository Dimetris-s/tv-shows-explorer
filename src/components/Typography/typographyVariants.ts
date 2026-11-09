import { cva } from 'class-variance-authority';

import type { TypographyTag, TypographyVariant } from './Typography.types';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      display: 'font-heading text-display',
      h1: 'font-heading text-h1',
      h2: 'font-heading text-h2',
      title: 'font-heading text-title',
      body: 'text-body',
      small: 'text-small',
      overline: 'text-overline uppercase',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-subtle',
      primary: 'text-primary',
      danger: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'body',
    tone: 'default',
  },
});

export const defaultTags: Record<TypographyVariant, TypographyTag> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  title: 'h3',
  body: 'p',
  small: 'p',
  overline: 'span',
};
