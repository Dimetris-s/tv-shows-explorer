import { HttpError } from '@/services/http';

import { setCurrentUser } from './setCurrentUser';

const UNAUTHORIZED = 401;

export const dropSessionIfUnauthorized = (error: unknown) => {
  if (error instanceof HttpError && error.status === UNAUTHORIZED) setCurrentUser(null);
};
