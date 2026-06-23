import { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  /** Native button type. Only applies when `as === 'button'`. */
  type?: 'button' | 'submit';
  /** Disable the button. Only applies when `as === 'button'`. */
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  as = 'button',
  href,
  type = 'button',
  disabled = false,
}: ButtonProps): JSX.Element {
  const classes = `btn btn--${variant} ${className}`;

  if (as === 'a') {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
