import { Typography } from '@/components/Typography';

export const Header = () => {
  return (
    <header className="flex min-h-18 items-center border-b border-border">
      <Typography variant="h2" as="div">
        TV<span className="text-primary">·</span>Explorer
      </Typography>
    </header>
  );
};
