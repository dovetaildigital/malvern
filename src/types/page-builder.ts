import type { HeroProps } from './hero';
import type { StackItem } from './imagestack';

export type Block = 
  | ({ __typename: 'HeroComponent' } & HeroProps)
  | ({ __typename: 'ImageStackComponent' } & { imageStackItems: StackItem[] });
  // | ({ __typename: 'GridComponent' } & GridProps); // add more here
