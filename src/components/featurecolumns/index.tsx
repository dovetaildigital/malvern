// /src/components/FeatureColumns.tsx

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
      <div
        className="md:hidden overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scroll-padding-inline:1.5rem]"
        style={{ overflowY: 'visible' }}
      >
        <div className="flex gap-6 overflow-visible">
          {featureColumnsColumns.map((col, index) => {
            if (!col) return null;
            const { featureLink } = col;

            return (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] max-w-[22rem] flex flex-col items-center space-y-4 snap-start overflow-visible"
                data-fade
              >
                {col.columnImages && (
                  <div className="w-full">
                    <div className="flex flex-col gap-4">
                      {col.columnImages.map((img, imgIndex) => (
                        <div key={imgIndex} className="w-full">
                          {img?.sourceUrl && (
                            <img
                              src={img.sourceUrl}
                              alt={img.altText || ''}
                              className="w-full h-auto rounded-lg shadow-subtle aspect-square object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {col.columnText && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: col.columnText }}
                  />
                )}

                {featureLink?.url && featureLink?.title && (
                  <div className="flex justify-start w-auto p-4 overflow-visible">
                    <a
                      href={featureLink.url}
                      target={featureLink.target || '_self'}
                      className="btn btn-primary w-full sm:w-auto"
                      rel={featureLink.target === '_blank' ? 'noopener noreferrer' : undefined}
                    >
                      {featureLink.title}
                      <ArrowCircleRightIcon
                        size={32}
                        className="h-5 w-5 flex-shrink-0 ml-2 justify-self-end"
                      />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex-shrink-0 w-6" aria-hidden />
        </div>
      </div>

      <div className={`hidden md:block ${containerWidth}`}>
        <div className="grid grid-cols-1 p-4 md:p-0 md:grid-cols-3 gap-12 gap-y-24 md:gap-x-12 md:gap-y-36">
          {featureColumnsColumns.map((col, index) => {
            if (!col) return null;
            const { featureLink } = col;

            return (
              <div key={index} className="flex flex-col items-start space-y-4" data-fade>
                {col.columnImages && (
                  <div className="w-full">
                    <div className="flex flex-col gap-4">
                      {col.columnImages.map((img, imgIndex) => (
                        <div key={imgIndex} className="w-full">
                          {img?.sourceUrl && (
                            <img
                              src={img.sourceUrl}
                              alt={img.altText || ''}
                              className="w-full h-auto rounded-lg shadow-subtle aspect-square object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {col.columnText && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: col.columnText }}
                  />
                )}

                {featureLink?.url && featureLink?.title && (
                  <div className="flex justify-start w-full">
                    <a
                      href={featureLink.url}
                      target={featureLink.target || '_self'}
                      className="btn btn-primary w-full sm:w-auto"
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
