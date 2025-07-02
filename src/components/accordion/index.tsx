import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AccordionItem = {
  accordionHeadline: string;
  accordionContent: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev: number | null) => prev === index ? null : index);
  };

  return (
    <div className="space-y-2 max-w-4xl mx-auto">
      {items.map((item: AccordionItem, index: number) => {
        const isOpen = openIndex === index;
        
        return (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center
                        hover:bg-gray-50 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-button-${index}`}
            >
              <span className="font-medium text-lg">{item.accordionHeadline}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { 
                      opacity: 1, 
                      height: 'auto',
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }
                    },
                    collapsed: { 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }
                    }
                  }}
                  aria-hidden={!isOpen}
                  aria-labelledby={`accordion-button-${index}`}
                >
                  <div 
                    className="px-6 py-2"
                    dangerouslySetInnerHTML={{ __html: item.accordionContent }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}