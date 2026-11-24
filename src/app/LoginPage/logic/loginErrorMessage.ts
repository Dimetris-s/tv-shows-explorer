import { HttpError } from '@/services/http';

const BAD_REQUEST = 400;

export const loginErrorMessage = (error: unknown) => {
  if (error instanceof HttpError && error.status === BAD_REQUEST) return 'Похоже, это не email';
  return error instanceof Error ? error.message : 'Не удалось войти';
};
