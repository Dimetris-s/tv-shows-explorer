import type { ReactNode } from 'react';

export type ChipProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  /** Shown after the label, e.g. the number of shows in a genre. */
  count?: number;
};
