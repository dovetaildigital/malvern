// src/components/ui/icon.tsx

import React from 'react';
import { icons } from '@/lib/icons';
import type { IconSlug } from '@/types/buttons';

interface IconProps {
  icon: IconSlug;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  const iconUrl = icons[icon];
  if (!iconUrl) return null;

  return <img src={iconUrl} alt="" aria-hidden className={className || 'w-4 h-4'} />;
};

export default Icon;
