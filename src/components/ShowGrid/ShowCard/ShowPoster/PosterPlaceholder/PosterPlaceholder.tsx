import { Film } from 'lucide-react';

import { Typography } from '@/components/Typography';

import styles from './PosterPlaceholder.module.css';
import type { PosterPlaceholderProps } from './PosterPlaceholder.types';

export const PosterPlaceholder = ({ title, caption }: PosterPlaceholderProps) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2.5 px-11 text-center">
      <div aria-hidden="true" className={`${styles.strip} left-0`} />
      <div aria-hidden="true" className={`${styles.strip} right-0`} />
      <Film aria-hidden="true" className="size-7 text-primary" />
      <Typography variant="h2" as="span" className="text-2xl leading-tight font-bold">
        {title}
      </Typography>
      <Typography variant="overline" tone="muted" className="tracking-normal normal-case">
        {caption}
      </Typography>
    </div>
  );
};
