// src/components/AnimatedSubtitle.tsx
import { motion } from 'framer-motion';
import React from 'react';

export default function AnimatedSubtitle({ text }: { text: string }) {
  return (
    <motion.p
      id="hero-strapline"
      className="strapline relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      {text}
      <span
        id="gradient-overlay-subtitle"
        className="pointer-events-none absolute left-0 top-0 w-full h-full text-transparent 
                   bg-[linear-gradient(65deg,#DCF94D_0%,#FF4FA1_50%,#543DC6_100%)] 
                   bg-clip-text transition-opacity duration-300 opacity-100"
        style={{
          maskImage: 'radial-gradient(circle 240px at center, white 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 240px at center, white 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: '-9999px -9999px',
          WebkitMaskPosition: '-9999px -9999px',
          maskSize: '480px 480px',
          WebkitMaskSize: '480px 480px'
        }}
      >
        {text}
      </span>
    </motion.p>
  );
}
