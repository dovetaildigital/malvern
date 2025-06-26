// src/types/featurecolumns.ts

export interface ColumnImage {
    columnImagesStack: {
      node: {
        sourceUrl: string;
        altText?: string;
      } | null;
    } | null;
  }
  
export interface FeatureLink {
  title: string | null;
  url: string | null;
  target: string | null;
}

export interface FeatureColumn {
  columnText: string;
  columnImages: {
    sourceUrl: string;
    altText?: string;
  }[];
  featureLink?: {
    title: string;
    url: string;
    target?: string;
  };
}


export interface FeatureColumnsProps {
  featureColumnsColumns: Array<FeatureColumn | null> | null;
  containerWidth?: string;
  featureLink: FeatureLink | null;
}