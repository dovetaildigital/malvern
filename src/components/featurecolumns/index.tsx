import React from 'react';
import type { ParsedStackItem as Item } from '@/types/imagestack';
import type { FeatureLink, FeatureColumn } from '@/types/featurecolumns';
import { ArrowCircleRightIcon } from '@phosphor-icons/react';

interface ColumnImage {
  columnImagesStack: {
    node: {
      sourceUrl: string;
      altText?: string;
    } | null;
  } | null;
}

interface FeatureColumnsProps {
  featureColumnsColumns: Array<FeatureColumn | null> | null;
  containerWidth?: string;
}

const FeatureColumns: React.FC<FeatureColumnsProps> = ({ 
  featureColumnsColumns = [],
  containerWidth = 'container-xl',
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
    <section className="w-full px-4 py-18 lg:py-24 featurecolumns">
      <div className={containerWidth}>
        <div className="grid grid-cols-1 p-4 md:p-0 md:grid-cols-3 gap-12 gap-y-24 md:gap-x-12 md:gap-y-36">
          {featureColumnsColumns.map((col, index) => {
            if (!col) return null;
            const { featureLink } = col;
            
            return (
              <div key={index} className="flex flex-col items-center md:items-start space-y-4" data-fade>
                {col.columnImages?.map((img, imgIndex) => (
                  <div key={imgIndex} className="w-1/2 md:w-full">
                    {img?.sourceUrl && (
                      <img
                        src={img.sourceUrl}
                        alt={img.altText || ''}
                        className="w-full h-auto rounded-lg shadow-subtle aspect-square object-cover"
                      />
                    )}
                  </div>
                ))}
                {col.columnText && (
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: col.columnText }} 
                  />
                )}
           {featureLink?.url && featureLink?.title && (
                <div className="flex justify-start">
                  <a
                    href={featureLink.url}
                    target={featureLink.target || '_self'}
                    className="btn btn-primary"
                    rel={featureLink.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {featureLink.title}
                    <ArrowCircleRightIcon size={32} className="h-5 w-5 flex-shrink-0 ml-2" />
                  </a>
                </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeatureColumns);
