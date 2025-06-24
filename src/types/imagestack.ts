export interface StackItem {
  stackImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  stackLabel?: string;
}

export interface ParsedStackItem {
  id: string;
  src: string;
  alt: string;
  label: string;
}
