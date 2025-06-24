import type { RichTextContent } from './richtext';

export interface TextColumn {
  columnWidth: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'full';
  columnContent: RichTextContent;
  columnButton?: {
    buttonLink: {
      title: string;
      url: string;
      target: string;
    };
    buttonIcon: string;
    buttonStyle: 'primary' | 'secondary' | 'ghost';
  };
}
