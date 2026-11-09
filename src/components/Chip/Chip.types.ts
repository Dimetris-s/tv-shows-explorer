import type { ReactNode } from 'react';

export type ChipProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  count?: number;
};
