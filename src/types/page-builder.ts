import type { HeroProps } from './hero';
import type { StackItem } from './imagestack';

export type Block =
  | ({ __typename: 'PageBuilderContentHeroLayout' } & HeroProps)
  | {
      __typename: 'PageBuilderContentImageStackLayout';
      imageStackItems: StackItem[];
    };
