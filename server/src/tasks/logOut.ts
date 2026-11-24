import { session } from '#stores/session.ts';

export const logOut = (sessionId: string) => {
  delete session[sessionId];
};
