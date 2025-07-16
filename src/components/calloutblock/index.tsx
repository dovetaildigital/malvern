import React, { useEffect, useRef, useState } from 'react';
import type { CalloutBlockProps } from '@/types/calloutblock';
import Icon from '@/components/ui/icon';

const CalloutBlock: React.FC<CalloutBlockProps> = ({ calloutItem }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          const topmost = visibleEntries[0];
          const newIndex = Number(topmost.target.getAttribute('data-index'));
          setActiveIndex(newIndex);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  if (!calloutItem || calloutItem.length === 0) {
    return null;
  }

  return (
    <section className="w-[85vw] md:w-full mx-auto px-4 py-18 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 md:grid md:gap-8 md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {calloutItem.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}                data-index={index}
                className={`bg-white p-4 border border-foreground/5 md:border-none rounded-lg shadow-sm hover:shadow-md
                  transition-transform transition-opacity duration-500 ease-in-out
                  flex flex-col items-center
                  sticky top-24 z-[${10 + index}]
                  ${isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-70'}
                  md:static md:z-auto md:scale-100 md:opacity-100`}
                style={{ minHeight: '200px' }}
                data-fade
              >
                {item?.calloutIcon && (
                  <div className="text-3xl mb-4 text-blue-600">
                    <Icon icon={item.calloutIcon} className="w-12 h-12" />
                  </div>
                )}
                {item?.calloutHeadline && (
                  <h3 className="heading-3 text-center md:text-xl">
                    {item.calloutHeadline}
                  </h3>
                )}
                {item?.calloutDescription && (
                  <p className="text-center">{item.calloutDescription}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CalloutBlock);
