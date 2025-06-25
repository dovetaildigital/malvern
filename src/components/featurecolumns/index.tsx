import React from 'react';
import type { ParsedStackItem as Item } from '@/types/imagestack';

interface ColumnImage {
  columnImagesStack: {
    node: {
      sourceUrl: string;
      altText?: string;
    } | null;
  } | null;
}

interface FeatureColumn {
  columnText: string | null;
  columnImages: Array<ColumnImage | null> | null;
}

interface FeatureColumnsProps {
  featureColumnsColumns: Array<FeatureColumn | null> | null;
  containerWidth?: string;
}

const FeatureColumns: React.FC<FeatureColumnsProps> = ({ 
  featureColumnsColumns = [],
  containerWidth = 'container-lg',
}) => {
  if (!featureColumnsColumns || featureColumnsColumns.length === 0) {
    return null;
  }

  const getRandomRotation = (index: number) => {
    const seed = index * 1000 + Math.random() * 1000;
    const random = Math.sin(seed) * 10000;
    return ((random - Math.floor(random)) * 8) - 4;
  };

  return (
      <div className={containerWidth}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-36">

              {featureColumnsColumns.map((col, index) => {
            if (!col) return null;

            const rawItems = (col.columnImages || []).map((img, idx) => {
              const node = img?.columnImagesStack?.node;
              if (!node?.sourceUrl) return null;
              return {
                id: `${index}-${idx}`,
                src: node.sourceUrl,
                alt: node.altText ?? ''
              };
            });

            const items = rawItems.filter((item): item is Item => item !== null);

            return (
              <div
                key={index}
                className={`
                  flex flex-col gap-8
                  ${
                    index % 3 !== 0 // If not first in row
                      ? '' 
                      : ''
                  }
                `}
              >
                {items.length > 0 && (
  <div className="relative h-[300px] w-full">
    <img
      src={items[0].src}
      alt={items[0].alt || ''}
      className="w-full h-full object-cover rounded-lg shadow-subtle mt-4"
      style={{ 
        transform: ``,
        transition: 'transform 0.3s ease-in-out'
      }}
    />
  </div>
)}
                {col.columnText && (
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: col.columnText }} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default React.memo(FeatureColumns);
