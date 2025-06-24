// src/types/buttons.ts

import { icons } from '@/lib/icons';

export type IconSlug = keyof typeof icons;

export interface CTA {
  label: string;
  url: string;
  target?: string;
  icon?: IconSlug;
}
