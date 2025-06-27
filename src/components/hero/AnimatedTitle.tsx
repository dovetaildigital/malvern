import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedTitleProps {
  title: string;
  pageKey?: string; // Changed from 'key' to 'pageKey'

}


export default function AnimatedTitle({ title, pageKey }: { title: string; pageKey?: string }) {
  return (
    <motion.h1
      data-gradient-target
      className="heading-1 relative z-10 overflow-visible pb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeInOut',
        delay: 0.1
      }}
      key={pageKey}
    >
      {title}
      <span
        data-gradient-overlay
        className="pointer-events-none absolute left-0 top-0 w-full h-[120%] text-transparent 
                 bg-[linear-gradient(65deg,#DCF94D_0%,#FF4FA1_50%,#543DC6_100%)] 
                 bg-clip-text transition-opacity duration-300 opacity-100"
        style={{
          maskImage: 'radial-gradient(circle 300px at center, white 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 300px at center, white 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: '-9999px -9999px',
          WebkitMaskPosition: '-9999px -9999px',
          maskSize: '600px 600px',
          WebkitMaskSize: '600px 600px'
        }}
      >
        {title}
      </span>
    </motion.h1>
  );
}