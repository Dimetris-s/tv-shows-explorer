import type { User } from '#contract/index.ts';

export type AppEnv = {
  Variables: {
    user: User | null;
  };
};

export type UserEnv = {
  Variables: {
    user: User;
  };
};
