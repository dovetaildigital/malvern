export interface StackItem {
  label?: string;
  image: {
    node: {
      id: string;
      sourceUrl: string;
      altText?: string;
    };
  };
}

  
  export interface ParsedStackItem {
    id: string;
    src: string;
    alt?: string;
    label: string;
  }
  