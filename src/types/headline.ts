// src/types/headline.ts
export interface HeadlineItem {
    headlineText: string;
    headlineSize?: string | null;
  }
  
  export interface HeadlineProps {
    headline: HeadlineItem[];
    containerWidth?: string;
  }