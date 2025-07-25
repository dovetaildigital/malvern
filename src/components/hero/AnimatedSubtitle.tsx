// src/components/AnimatedSubtitle.tsx
import { motion } from 'framer-motion';
import React from 'react';


interface AnimatedSubtitleProps {
  text: string;
  pageKey?: string;
}

export default function AnimatedSubtitle({ text , pageKey }: AnimatedSubtitleProps) {
  return (
    <motion.p
      data-gradient-target
      id="hero-strapline"
      className="strapline relative z-10 text-center"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
      key={pageKey}
    >
      {text}
      <span
  data-gradient-overlay
  id="gradient-overlay-subtitle"
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
  {text}
</span>
    </motion.p>
  );
}
