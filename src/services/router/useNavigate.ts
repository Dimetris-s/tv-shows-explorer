import { useCallback } from 'react';
import { useLocation } from 'wouter';

export type NavigateOptions = {
  replace?: boolean;
};

export const useNavigate = () => {
  const [, navigate] = useLocation();
  return useCallback(
    (path: string, options: NavigateOptions = {}) => navigate(path, options),
    [navigate],
  );
};
