import type { ReactNode } from 'react';

export type DialogProps = {
  label: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
};
