import type { Context } from 'hono';

import type { ApiError } from '#/contract/index.ts';

type Issue = { path: PropertyKey[]; message: string };

type ValidationResult = { success: true } | { success: false; error: { issues: Issue[] } };

export const onInvalid = (result: ValidationResult, c: Context) => {
  if (result.success) return undefined;
  const [issue] = result.error.issues;
  const field = issue?.path.map(String).join('.') || 'request';
  return c.json<ApiError>({ error: `Invalid ${field}: ${issue?.message ?? 'bad value'}` }, 400);
};
