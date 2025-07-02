// src/types/carousel.ts
// TypeScript types for the Carousel GraphQL fragment

/**
 * Possible autoplay behaviors for the carousel
 */
export type CarouselAutoplayBehaviour = 'always' | 'never' | 'onScroll';

/**
 * Possible transition effects for the carousel
 */
export type CarouselEffect = 'slide' | 'fade';

/**
 * Breakpoint settings for responsive slide counts
 */
export interface CarouselBreakpoints {
  carouselBreakpointsMobile: number | null;
  carouselBreakpointsTablet: number | null;
  carouselBreakpointsDesktop: number | null;
}

/**
 * Image node returned by ACF image fields
 */
export interface CarouselContentImage {
  node: {
    sourceUrl: string | null;
    altText: string | null;
  } | null;
}

/**
 * Link object returned by ACF link fields
 */
export interface CarouselContentLink {
  url: string | null;
  title: string | null;
  target: string | null;
}

/**
 * Single slide content in the carousel
 */
export interface CarouselContent {
  carouselContentsCaption: string | null;
  carouselContentsImage: CarouselContentImage | null;
  carouselContentsLink: CarouselContentLink | null;
}

/**
 * Root type matching the CarouselFields fragment
 */
export interface CarouselFields {
  __typename?: 'PageBuilderContentCarouselLayout';
  carouselAutoplayBehaviour: Array<string | null> | null;
  carouselShowNavigationArrows: boolean | null;
  carouselContinuousScroll?: boolean;
  carouselInterval: number | null;
  carouselSpeed: number | null;
  carouselLoop: boolean | null;
  carouselPauseOnHover: boolean | null;
  carouselEffect: Array<string | null> | null;
  carouselPaginationDots: boolean | null;
  carouselSlidesPerView: number | null;
  carouselSlidesToScroll: number | null;
  carouselLazyLoad: boolean | null;
  carouselBreakpoints: CarouselBreakpoints | null;
  carouselContents: Array<CarouselContent | null> | null;
}
