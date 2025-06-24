// src/components/ui/submit.tsx
import React, { type ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'default';
  children: ReactNode;
  className?: string;
}

const Submit: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const variants: Record<string, string> = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    default: 'btn btn-default',
  };

  const variantClass = variants[variant] || '';

  return (
    <button
      className={`${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Submit;
