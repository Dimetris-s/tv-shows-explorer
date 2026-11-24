import type { User } from '#types/user.ts';

export type { User };

export type Session = {
  user: User | null;
};

export type LoginResponse = {
  user: User;
};

export type LoginRequest = {
  email: string;
};
