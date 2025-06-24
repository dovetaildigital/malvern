// components/ui/primarycta/index.tsx
import React from 'react';
import Icon from '@/components/ui/icon';
import type { CTA } from '@/types/buttons';

const PrimaryCTA: React.FC<CTA & { className?: string }> = ({
  label,
  url,
  target = '_self',
  icon,
  className = ''
}) => (
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

export default PrimaryCTA;
