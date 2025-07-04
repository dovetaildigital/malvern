// src/components/calloutblock/index.tsx
import React from 'react';
import type { CalloutBlockProps } from '@/types/calloutblock';
import Icon from '@/components/ui/icon';

const CalloutBlock: React.FC<CalloutBlockProps> = ({ calloutItem }) => {
  if (!calloutItem || calloutItem.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 py-18 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {calloutItem.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
              data-fade
            >
              {item?.calloutIcon && (
                <div className="text-3xl mb-4 text-blue-600">
                  <Icon 
                    icon={item.calloutIcon} 
                    className="w-12 h-12" 
                  />
                </div>
              )}
              {item?.calloutHeadline && (
                <h3 className="heading-3 text-center">
                  {item.calloutHeadline}
                </h3>
              )}
              {item?.calloutDescription && (
                <p className="text-center">
                  {item.calloutDescription}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CalloutBlock);