import { session } from '#stores/session.ts';
import type { User } from '#types/user.ts';

export type LogInResult = {
  sessionId: string;
  user: User;
};

export const logIn = (email: string): LogInResult => {
  const user = { email: email.trim().toLowerCase() };
  const sessionId = crypto.randomUUID();
  session[sessionId] = user.email;
  return { sessionId, user };
};
