import { useState } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { selectEmail, sessionStore } from '@/stores/sessionStore';

import { logOut } from './tasks/logOut';

export const useUserMenuPresenter = () => {
  const email = useStore(sessionStore, selectEmail);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = () => {
    setIsLoggingOut(true);
    logOut()
      .catch(() => toast.error('Не удалось выйти', { description: 'Попробуйте ещё раз.' }))
      .finally(() => setIsLoggingOut(false));
  };

  return { email, isLoggingOut, handleLogOut };
};
