import { session } from '#stores/session.ts';
import type { User } from '#types/user.ts';

export const findSessionUser = (sessionId: string | undefined): User | null => {
  const email = sessionId ? session[sessionId] : undefined;
  return email ? { email } : null;
};
