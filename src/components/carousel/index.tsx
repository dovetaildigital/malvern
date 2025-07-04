import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaEventType, EmblaOptionsType } from 'embla-carousel';

import type { CarouselFields } from '@/types/carousel';

// Embla Carousel integration for both continuous and interval modes
const Carousel: React.FC<{ data: CarouselFields }> = ({ data }) => {
  // Destructure fields from CMS data
  const {
    carouselContents = [],
    carouselLoop = true,   
    carouselSlidesPerView = 1,
    carouselAutoplayBehaviour,
    carouselPauseOnHover,
    carouselInterval,
    carouselSpeed,
    carouselShowNavigationArrows,
    carouselPaginationDots,
    carouselLazyLoad,
  } = data;

  // Prepare slides array
  const rawSlides = carouselContents || [];
  const slides = rawSlides.filter(
    (item): item is NonNullable<typeof item> =>
      !!item && !!item.carouselContentsImage?.node?.sourceUrl
  );
  if (!slides.length) return null;
  
  const autoplayMode = (Array.isArray(carouselAutoplayBehaviour) 
    ? carouselAutoplayBehaviour[0] 
    : carouselAutoplayBehaviour) as 'always' | 'never' | 'onScroll' | undefined ?? 'never';
  
    
  const intervalMs = carouselInterval ?? 5000;
  const pauseOnHover = carouselPauseOnHover ?? true;
  const perView = carouselSlidesPerView ?? 1;
  const slidePct = 100 / perView;

  // Embla options
// Update the emblaOptions to handle null case
const emblaOptions: EmblaOptionsType = {
    loop: carouselLoop ?? true,  // Handle null case
    slidesToScroll: 1,  // Fixed value
    align: 'start',
    duration: Math.min(Math.max(Number(carouselSpeed) || 500, 100), 20000),  // Clamp between 100-10000ms
};

  // Embla initialization
  const [emblaRef, embla] = useEmblaCarousel(emblaOptions);

  // Debug when Embla instance becomes available
  useEffect(() => {
    if (autoplayMode !== 'always') {
      return;
    }
    if (!embla) {
      return;
    }
  
  

    const play = () => {
        if (!embla) return;
        
        if (carouselLoop) {
          // If looping is enabled, just go to next
          embla.scrollNext();
        } else {
          // If not looping, check if we're at the end
          if (embla.canScrollNext()) {
            embla.scrollNext();
          } else {
            // If at the end, rewind to start
            embla.scrollTo(0);
          }
        }
      };
      
      let timer: NodeJS.Timeout;
      const startAutoplay = () => {
        timer = setInterval(play, intervalMs);
      };
    
      const stopAutoplay = () => {
        clearInterval(timer);
      };
    
      startAutoplay();
    
// Handle hover events
const container = embla.containerNode();
if (container && pauseOnHover) {
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
}

return () => {
  stopAutoplay();
  if (container) {
    container.removeEventListener('mouseenter', stopAutoplay);
    container.removeEventListener('mouseleave', startAutoplay);
  }
};
}, [embla, autoplayMode, carouselInterval, carouselSpeed, pauseOnHover]);
  
  // Navigation callbacks
  const scrollPrev = React.useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const scrollNext = React.useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  return (
    <section className="py-24">
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((item, idx) => {
            const img = item.carouselContentsImage?.node;
            if (!img?.sourceUrl) return null;
            
            return (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{ 
                  width: `${slidePct}%`, 
                  padding: '0 0.5rem', 
                  boxSizing: 'border-box' 
                }}
              >
                <img
                  src={img.sourceUrl}
                  alt={img.altText || ''}
                  className="w-2/4 mx-auto h-auto object-contain aspect-square"
                  loading={carouselLazyLoad ? 'lazy' : 'eager'}
                />
              </div>
            );
          })}
        </div>
      </div>

      {carouselShowNavigationArrows && (
        <> 
          <button 
            onClick={scrollPrev} 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {carouselPaginationDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => embla?.scrollTo(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                embla?.selectedScrollSnap() === idx ? 'bg-white' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
    </section>
  );
};

export default Carousel;