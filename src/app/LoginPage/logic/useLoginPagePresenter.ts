import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { paths } from '@/lib/paths';
import { useNavigate } from '@/services/router';
import { selectIsSignedIn, sessionStore } from '@/stores/sessionStore';

import { loginErrorMessage } from './loginErrorMessage';
import { logIn } from './tasks/logIn';

export const useLoginPagePresenter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignedIn = useStore(sessionStore, selectIsSignedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) navigate(paths.home, { replace: true });
  }, [isSignedIn, navigate]);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    logIn(email)
      .then(
        (user) => toast.success('Вы вошли', { description: user.email }),
        (reason: unknown) => setError(loginErrorMessage(reason)),
      )
      .finally(() => setIsSubmitting(false));
  };

  return {
    email,
    error,
    hasError: error !== null,
    isSubmitting,
    submitLabel: isSubmitting ? 'Входим…' : 'Войти',
    homePath: paths.home,
    handleEmailChange,
    handleSubmit,
  };
};
