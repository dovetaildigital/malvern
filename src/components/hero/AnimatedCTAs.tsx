import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import PrimaryCTA from '../ui/primarycta';
import SecondaryCTA from '../ui/secondarycta';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delay: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut
    }
  }
};

type CTA = {
  label: string;
  url: string;
  target: string;
  icon: string | null;
};

export default function AnimatedCTAs({
  primaryCta,
  secondaryCta,
  alignment = 'center'
}: {
  primaryCta?: CTA | null;
  secondaryCta?: CTA | null;
  alignment?: string;
}) {
  return (
    <motion.div
      className={`flex flex-wrap gap-4 justify-${alignment}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {primaryCta && (
        <motion.div key={primaryCta.label} variants={item}>
          <PrimaryCTA
            label={primaryCta.label}
            url={primaryCta.url}
            target={primaryCta.target}
            icon={primaryCta.icon ?? undefined}
          />
        </motion.div>
      )}

      {secondaryCta && (
        <motion.div key={secondaryCta.label} variants={item}>
          <SecondaryCTA
            label={secondaryCta.label}
            url={secondaryCta.url}
            target={secondaryCta.target}
            icon={secondaryCta.icon ?? undefined}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
