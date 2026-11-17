import { DialogContent, Dialog as UiDialog } from '@/components/ui/dialog';

import type { DialogProps } from './Dialog.types';

export const Dialog = ({ label, isOpen, onOpenChange, children }: DialogProps) => {
  return (
    <UiDialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        aria-label={label}
        showCloseButton={false}
        className="inset-0 top-0 left-0 block h-svh w-full max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none bg-background p-0 text-base text-foreground ring-0 sm:max-w-none"
      >
        <div className="relative h-full overflow-y-auto">{children}</div>
      </DialogContent>
    </UiDialog>
  );
};
