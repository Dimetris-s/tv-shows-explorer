import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { CircleAlertIcon, StarIcon } from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      className="toaster group"
      icons={{
        success: <StarIcon className="size-5 fill-primary text-primary" />,
        info: <StarIcon className="size-5 text-muted-foreground" />,
        error: <CircleAlertIcon className="size-5 text-destructive" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-[380px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-foreground shadow-xl shadow-black/50',
          error: 'border-destructive',
          icon: 'mt-px flex-none',
          content: 'flex flex-col gap-0.5',
          title: 'text-sm font-semibold',
          description: 'text-small text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
