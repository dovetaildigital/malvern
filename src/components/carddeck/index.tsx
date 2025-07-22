import React, { useState, useRef } from 'react';
import type { CardDeckProps } from '@/types/carddeck';
import Icon from '@/components/ui/icon';

const ProcessTabs: React.FC<CardDeckProps> = ({ cardDeckItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!cardDeckItem?.length) return null;

  return (
    <section className="bg-base-100 px-4 py-16">
      <div className="container mx-auto max-w-sm md:max-w-2xl">
        {/* Tab Titles */}
        <ul className="flex overflow-x-auto mb-8 justify-between">
          {cardDeckItem.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={index} className="action-link">
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap transition-all duration-300 rounded-full font-medium ${
                    isActive 
                      ? 'text-black' 
                      : 'text-base-content hover:text-background'
                  }`}
                >
                  {/* Gradient background span */}
                  <span className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive 
                      ? 'opacity-100 bg-[linear-gradient(65deg,_#DCF94D_0%,_#FF4FA1_50%,_#543DC6_100%)]' 
                      : 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 to-transparent'
                  }`}></span>
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    {item.cardDeckIcon && (
                      <Icon 
                        icon={item.cardDeckIcon} 
                        className={`w-6 h-6 md:w-4 md:h-4 ${isActive 
                          ? '!text-white' 
                          : 'text-black group-hover:text-white'}`} 
                        weight={isActive ? 'bold' : 'regular'}
                      />
                    )}
                    <span className={`hidden md:inline ${isActive ? 'text-background' : 'text-base-content'}`}>
                      {item.cardDeckHeadline}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Swipeable Content Area */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:block md:overflow-visible"
        >
          {cardDeckItem.map((item, index) => (
            <div
              key={index}
              className="snap-start"
            >
              
              {index === activeIndex && (
                <div className="space-y-4">
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.cardDeckHeadline}
                  </h3>
                  <p className="text-base text-base-content/80 text-left">
                    {item.cardDeckDescription}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTabs;