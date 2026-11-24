import type { User } from '@tv/server/contract';
import { createStore } from 'zustand/vanilla';

export type SessionState = {
  user: User | null;
  isResolved: boolean;
};

export const sessionStore = createStore<SessionState>(() => ({ user: null, isResolved: false }));

export const selectIsSignedIn = (state: SessionState) => state.user !== null;

export const selectIsGuest = (state: SessionState) => state.isResolved && state.user === null;

export const selectEmail = (state: SessionState) => state.user?.email ?? null;
