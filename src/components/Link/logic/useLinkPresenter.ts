import type { MouseEvent } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { useNavigate } from '@/services/router';

import type { LinkProps } from '../Link.types';

const isPlainClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export const useLinkPresenter = ({ to, children, variant = 'ghost', className }: LinkProps) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    navigate(to);
  };

  return {
    href: to,
    children,
    className: buttonVariants({ variant, className }),
    handleClick,
  };
};
