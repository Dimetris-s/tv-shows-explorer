import { Button } from '@/components/ui/button';

export const App = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">TV Shows Explorer</h1>
      <Button>Explore</Button>
    </main>
  );
};
