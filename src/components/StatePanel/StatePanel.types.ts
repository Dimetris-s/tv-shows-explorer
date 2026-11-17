import type { ReactNode } from 'react';

import type { TypographyTone } from '@/components/Typography';

export type StatePanelProps = {
  illustration: ReactNode;
  overline: string;
  overlineTone: TypographyTone;
  title: ReactNode;
  description: string;
  action: ReactNode;
  role: 'status' | 'alert';
};
