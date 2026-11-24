import type { Session } from '@tv/server/contract';

import { httpGet } from '@/services/http';
import { loadFavoritesCount } from '@/tasks/loadFavoritesCount';
import { setCurrentUser } from '@/tasks/setCurrentUser';

export const restoreSession = async () => {
  try {
    const { user } = await httpGet<Session>('/api/auth/me');
    setCurrentUser(user);
    if (user) await loadFavoritesCount();
  } catch (error) {
    setCurrentUser(null);
    throw error;
  }
};
