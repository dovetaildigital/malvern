export interface HeroProps {
  heroType?: string[];
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  } | null;
  heroTextTheme?: string[];
  heroPrimaryCta?: {
    title: string;
    url: string;
    target?: string;
  };
  heroSecondaryCta?: {
    title: string;
    url: string;
    target?: string;
  };
}
