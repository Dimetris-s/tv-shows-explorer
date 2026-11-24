import { ArrowLeft, Mail } from 'lucide-react';

import { Button } from '@/components/Button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/InputGroup';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';

import { useLoginPagePresenter } from './logic/useLoginPagePresenter';

export const LoginPage = () => {
  const {
    email,
    error,
    hasError,
    isSubmitting,
    submitLabel,
    homePath,
    handleEmailChange,
    handleSubmit,
  } = useLoginPagePresenter();

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6 pt-8">
      <Link to={homePath} className="self-start px-0">
        <ArrowLeft aria-hidden="true" />К поиску
      </Link>
      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card px-8 py-10">
        <div className="flex flex-col gap-2">
          <Typography variant="h1">Вход</Typography>
          <Typography tone="muted">
            Только email: без пароля и регистрации. Избранное привязано к адресу.
          </Typography>
        </div>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">
          <InputGroup className="h-12 rounded-md">
            <InputGroupAddon className="pl-3.5">
              <Mail aria-hidden="true" className="size-5" />
            </InputGroupAddon>
            <InputGroupInput
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              required
              aria-label="Email"
              aria-invalid={hasError}
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              className="text-body"
            />
          </InputGroup>
          {hasError && (
            <div role="alert">
              <Typography variant="small" tone="danger">
                {error}
              </Typography>
            </div>
          )}
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </form>
      </div>
    </section>
  );
};
