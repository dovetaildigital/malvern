export type PaddingOption = 'more' | 'normal' | 'less';

export interface HeadlineItem {
  headlineText: string;
  headlineSize?: string | null;
  containerWidth?: string | null;
  topSpace?: PaddingOption | null;
  bottomSpace?: PaddingOption | null;
}

export interface HeadlineProps {
  headline: HeadlineItem;  // Usually one headline, so singular makes more sense
  containerWidth?: string | null;
  topSpace?: PaddingOption | null;
  bottomSpace?: PaddingOption | null;
}
