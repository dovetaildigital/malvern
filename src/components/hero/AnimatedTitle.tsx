import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { initGradientOverlay } from '../../utils/gradientEffect';

interface AnimatedTitleProps {
  title: string;
  pageKey?: string;
}

export default function AnimatedTitle({ title, pageKey }: AnimatedTitleProps) {
  useEffect(() => {
    // Initialize the gradient overlay effect
    initGradientOverlay();
  }, []);

  const titleLines = title.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));

  return (
    <motion.h1
      data-gradient-target
      id="hero-title"
      key={pageKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      className="heading-1 relative z-10 overflow-visible pb-2"
      tabIndex={-1} // Ensure consistent tabIndex
    >
      {titleLines}
      <span
        data-gradient-overlay
        className="pointer-events-none absolute left-0 top-0 w-full h-[120%] text-transparent
                 bg-[linear-gradient(65deg,#DCF94D_0%,#FF4FA1_50%,#543DC6_100%)]
                 bg-clip-text bg-contain"
        aria-hidden="true"

        style={{
          maskImage: 'radial-gradient(circle 300px, white 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle 300px, white 0%, transparent 80%)',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: '-9999px -9999px',
          WebkitMaskPosition: '-9999px -9999px',
          maskSize: '600px 600px',
          WebkitMaskSize: '600px 600px',
        }}
      >
        {titleLines}
      </span>
    </motion.h1>
  );
}