import { Typography } from '@/components/Typography';

import type { StatePanelProps } from './StatePanel.types';

export const StatePanel = ({
  illustration,
  overline,
  overlineTone,
  title,
  description,
  action,
  role,
}: StatePanelProps) => {
  return (
    <div
      role={role}
      className="flex flex-wrap items-center justify-center gap-10 rounded-xl border border-border bg-card px-8 py-14"
    >
      {illustration}
      <div className="flex max-w-[420px] flex-col items-start gap-3">
        <Typography variant="overline" tone={overlineTone}>
          {overline}
        </Typography>
        <Typography variant="h1">{title}</Typography>
        <Typography tone="muted">{description}</Typography>
        {action}
      </div>
    </div>
  );
};
