import type { ReactNode } from 'react';
import './IconButton.css';

type IconButtonProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  variant?: 'floating' | 'plain';
}>;

export function IconButton({ ariaLabel, children, onClick, isActive = false, variant = 'plain' }: IconButtonProps) {
  return (
    <button
      className={`icon-button icon-button--${variant}${isActive ? ' icon-button--active' : ''}`}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
