import { LogOut } from 'lucide-react';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { useUserMenuPresenter } from './logic/useUserMenuPresenter';

export const UserMenu = () => {
  const { email, isLoggingOut, handleLogOut } = useUserMenuPresenter();

  return (
    <div className="flex min-w-0 items-center gap-1">
      <Typography variant="small" tone="muted" className="hidden truncate sm:block">
        {email}
      </Typography>
      <Button variant="ghost" size="sm" disabled={isLoggingOut} onClick={handleLogOut}>
        <LogOut aria-hidden="true" />
        Выйти
      </Button>
    </div>
  );
};
