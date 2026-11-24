import type { LoginRequest, LoginResponse } from '@tv/server/contract';

import { httpPost } from '@/services/http';
import { loadFavoritesCount } from '@/tasks/loadFavoritesCount';
import { setCurrentUser } from '@/tasks/setCurrentUser';

export const logIn = async (email: string) => {
  const body: LoginRequest = { email };
  const { user } = await httpPost<LoginResponse>('/api/auth/login', { body });
  setCurrentUser(user);
  await loadFavoritesCount().catch(() => undefined);
  return user;
};
