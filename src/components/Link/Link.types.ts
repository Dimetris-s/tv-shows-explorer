import type { ReactNode } from 'react';

export type LinkVariant = 'default' | 'outline' | 'ghost';

export type LinkProps = {
  to: string;
  children: ReactNode;
  variant?: LinkVariant;
  className?: string;
};
