// src/components/ui/button.tsx

import React from 'react';
import Icon from './icon';
import type { IconSlug } from '@/types/buttons';

interface ButtonProps {
  label: string;
  url: string;
  target?: string;
  icon?: IconSlug;
  style?: 'primary' | 'secondary' | 'default';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    url,
    target = '_self',
    icon,
    style = 'primary',
    className
  }) => {
    const baseClass = className || 'btn';
    const variants: Record<string, string> = {
      primary: 'btn btn-primary',
      secondary: 'btn btn-secondary',
      default: 'btn btn-default'
    };
    const variantClass = variants[style] ?? '';
  
    return (
      <a
        href={url}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center gap-2 px-6 py-3 btn btn-primary relative z-10 ${className}`}
        >
          {label}
          {icon && <Icon icon={icon} className="h-5 w-5 flex-shrink-0 ml-2" />}
        </a>
    );
  };

export default Button;