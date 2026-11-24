import { httpPost } from '@/services/http';
import { setCurrentUser } from '@/tasks/setCurrentUser';

export const logOut = async () => {
  await httpPost<undefined>('/api/auth/logout');
  setCurrentUser(null);
};
