import type { LinkProps } from './Link.types';
import { useLinkPresenter } from './logic/useLinkPresenter';

export const Link = (props: LinkProps) => {
  const { href, children, className, handleClick } = useLinkPresenter(props);

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
