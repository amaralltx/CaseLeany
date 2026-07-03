import type { ReactNode } from 'react';
import './IconButton.css';

type IconButtonProps = Readonly<{
  children: ReactNode;
  ariaLabel: string;
  isActive?: boolean;
  variant?: 'default' | 'floating';
  onClick: () => void;
}>;

export function IconButton({
  children,
  ariaLabel,
  isActive = false,
  variant = 'default',
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={[
        'icon-button',
        `icon-button--${variant}`,
        isActive ? 'icon-button--active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {children}
    </button>
  );
}