export interface StackItem {
  stackImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  stackLabel?: string;
  hideOn?: 'all' | 'mobile' | 'desktop';
}

export interface ParsedStackItem {
  id: string;
  src: string;
  alt: string;
  label: string;
  hideOn?: 'all' | 'mobile' | 'desktop';
}
  