import type { ReactNode } from 'react';

export type TypographyVariant = 'display' | 'h1' | 'h2' | 'title' | 'body' | 'small' | 'overline';

export type TypographyTone = 'default' | 'muted' | 'subtle' | 'primary' | 'danger';

export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'label';

export type TypographyProps = {
  children: ReactNode;
  variant?: TypographyVariant;
  tone?: TypographyTone;
  as?: TypographyTag;
  className?: string;
};
