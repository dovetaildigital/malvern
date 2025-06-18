import { motion, easeInOut } from 'framer-motion';
import React from 'react';

type Cta = {
  label: string;
  url: string;
  target: string;
  iconSvg: string | null;
};

const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delay: 0.3 // Delay the entire container animation
      }
    }
  };
  
  const item = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
        // This ensures both opacity and y animate together
        opacity: { duration: 0.6, ease: easeInOut },
        y: { duration: 0.6, ease: easeInOut }
      }
    }
  };

export default function AnimatedCTAs({
  ctas,
  alignment = 'center'
}: {
  ctas: Cta[];
  alignment?: string;
}) {
  return (
    <motion.div
      className={`flex flex-wrap gap-4 justify-${alignment}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {ctas.map((cta) => (
        <motion.div
          key={cta.label}
          className="cta-primary"
          variants={item}
        >
          <a
            href={cta.url}
            target={cta.target}
            className="inline-flex items-center gap-2 relative z-10"
          >
            {cta.label}
            {cta.iconSvg && (
              <span
                className="w-5 h-5 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: cta.iconSvg }}
              />
            )}
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
}