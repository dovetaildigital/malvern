export interface CTA {
    ctaLabel: string;
    ctaLink: {
      url: string;
      title: string;
      target?: string;
    };
    ctaIcon?: string[];
  }
  
  export interface HeroProps {
    heroTitle: string;
    heroSubtitle?: string;
    heroType?: string[]; // ACF returns arrays
    heroAlignment?: string[];
    heroGradient?: string[];
    heroBackgroundType?: string[];
    heroBackgroundImage?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    } | null;
    heroImage?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    } | null;
    heroTextTheme?: string[];
    heroAnimationStyle?: string[];
    heroCtas?: CTA[];
  }
  