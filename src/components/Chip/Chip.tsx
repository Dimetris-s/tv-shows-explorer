import { Toggle } from '@base-ui/react/toggle';

import type { ChipProps } from './Chip.types';

export const Chip = ({ children, isActive, onClick, count }: ChipProps) => {
  return (
    <Toggle
      pressed={isActive}
      onPressedChange={onClick}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border-strong px-4 text-sm font-medium text-foreground transition-colors outline-none hover:border-primary hover:bg-primary-soft focus-visible:ring-3 focus-visible:ring-primary-soft data-pressed:border-primary data-pressed:bg-primary data-pressed:font-semibold data-pressed:text-primary-foreground"
    >
      {children}
      {count !== undefined && (
        <span className="text-muted-foreground in-data-pressed:text-primary-foreground">
          {count}
        </span>
      )}
    </Toggle>
  );
};
