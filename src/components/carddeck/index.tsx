// src/components/carddeck/index.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  animate,
  type PanInfo,
} from 'framer-motion';
import type { CardDeckProps } from '@/types/carddeck';
import Icon from '@/components/ui/icon';

/* layout */
const CARD_W   = 300;
const CARD_H   = 250;
const OVERLAP  = 100;

/* deterministic pseudo-random helpers */
const hash = (s: string) =>
  Array.from(s).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0) >>> 0;
const rnd  = (seed: number) => {
  const x = Math.sin(seed) * 10_000;
  return x - Math.floor(x);
};

/* ─────────────────────────────── Card ─────────────────────────────── */
type CardItem = {
  cardDeckIcon:        string | null;
  cardDeckHeadline:    string | null;
  cardDeckDescription: string | null;
};

interface DraggableCardProps {
  item:         CardItem;
  index:        number;
  draggingId:   React.MutableRefObject<string | null>;
  topCardId:    string | null;
  setTopCardId: React.Dispatch<React.SetStateAction<string | null>>;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  item,
  index,
  draggingId,
  topCardId,
  setTopCardId,
}) => {
  /* identity & seeded offsets */
  const id            = item.cardDeckHeadline ?? `card-${index}`;
  const seed          = hash(id);
  const startX        = rnd(seed)     * 200 - 100;
  const startY        = rnd(seed + 1) * -200 - 50;
  const startRotate   = rnd(seed + 2) * 30  - 15;

  /* motion values we’ll spring back to 0,0 */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /* fly-in once on mount */
  useEffect(() => {
    x.set(startX);
    y.set(startY);
    animate(x, 0, { type: 'spring', stiffness: 50, duration: 0.6, delay: index * 0.1 });
    animate(y, 0, { type: 'spring', stiffness: 50, duration: 0.6, delay: index * 0.1 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* handlers */
  const handleDragStart = () => {
    draggingId.current = id;
    setTopCardId(id);
  };

  const handleDragEnd = (
    _evt: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    draggingId.current = null;
    /* spring back to origin */
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 28 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 28 });
  };

  return (
    <motion.div
      style={{
        x, y,
        width: CARD_W,
        height: CARD_H,
        position: 'relative',
        marginLeft: index === 0 ? 0 : -OVERLAP,
        zIndex:
          topCardId === id        ? 50 :
          draggingId.current === id ? 49 :
          index + 1,
        borderRadius: 16,
        padding: '1rem',
        boxShadow:
          draggingId.current === id
            ? '0 25px 50px rgba(0,0,0,0.35)'
            : '0 10px 20px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease',
      }}
      initial={{ rotate: startRotate }}          /* opacity 1 so SS-render visible */
      drag
      className="bg-gradient-primary"
      /* allow ±150 px free roam */
      dragConstraints={{ top: -150, bottom: 150, left: -150, right: 150 }}
      dragElastic={0.25}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
      whileTap={{ cursor: 'grabbing', scale: 1.04 }}
    >
      <div className="card flex flex-col">
        <div className="flex items-left gap-4 p-4 bg-white">
          {item.cardDeckIcon && (
            <Icon icon={item.cardDeckIcon} className="w-8 h-8 shrink-0" />
          )}
          {item.cardDeckHeadline && (
            <h3 className="card-label">{item.cardDeckHeadline}</h3>
          )}
        </div>
        {item.cardDeckDescription && (
          <p className="card-body">{item.cardDeckDescription}</p>
        )}
      </div>

    </motion.div>
  );
};

/* ───────────────────────────── Deck wrapper ────────────────────────── */
const CardDeck: React.FC<CardDeckProps> = ({ cardDeckItem }) => {
  if (!cardDeckItem || cardDeckItem.length === 0) return null;

  const draggingId            = useRef<string | null>(null);
  const [topCardId, setTopCardId] = useState<string | null>(null);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center" style={{ minHeight: CARD_H }}>
          <div
            style={{
              position: 'relative',
              width: 'fit-content',
              height: CARD_H,
              overflow: 'visible',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}
          >
            {cardDeckItem.map((item, idx) => (
              <DraggableCard
                key={idx}
                item={item}
                index={idx}
                draggingId={draggingId}
                topCardId={topCardId}
                setTopCardId={setTopCardId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDeck;
