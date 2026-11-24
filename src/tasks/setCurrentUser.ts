import type { User } from '@tv/server/contract';

import { favoritesStore } from '@/stores/favoritesStore';
import { sessionStore } from '@/stores/sessionStore';

export const setCurrentUser = (user: User | null) => {
  sessionStore.setState({ user, isResolved: true });
  favoritesStore.setState(favoritesStore.getInitialState(), true);
};
