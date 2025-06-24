// src/types/featurecolumns.ts

export interface ColumnImage {
    columnImagesStack: {
      node: {
        sourceUrl: string;
        altText?: string;
      } | null;
    } | null;
  }
  
  export interface FeatureColumn {
    columnText: string | null;
    columnImages: Array<ColumnImage | null> | null;
  }
  
  export interface FeatureColumnsProps {
    featureColumnsColumns: Array<FeatureColumn | null> | null;
    containerWidth?: string;
  }
  