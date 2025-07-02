import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, type PanInfo } from 'framer-motion';
import type { CardDeckProps } from '@/types/carddeck';
import Icon from '@/components/ui/icon';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 250;
const SIDE_PADDING = 32; // px-4 on each side
const OVERLAP_X = 60; // horizontal overlap
const OVERLAP_Y = 40; // vertical overlap

type CardItem = {
  cardDeckIcon: string | null;
  cardDeckHeadline: string | null;
  cardDeckDescription: string | null;
};

const DraggableCard = ({
  item,
  index,
  draggingId,
  topCardId,
  setTopCardId,
}: {
  item: CardItem;
  index: number;
  draggingId: React.MutableRefObject<string | null>;
  topCardId: string | null;
  setTopCardId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const id = item.cardDeckHeadline ?? `card-${index}`;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    animate(x, 0, { type: 'spring', stiffness: 50 });
    animate(y, 0, { type: 'spring', stiffness: 50 });
  }, []);

  return (
    <motion.div
      style={{
        x,
        y,
        zIndex:
          topCardId === id
            ? 50
            : draggingId.current === id
            ? 49
            : index - 1,
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
      drag
      className="bg-gradient-primary w-[300px] h-[250px] shrink-0"
      dragConstraints={{ top: -50, bottom: 50, left: -150, right: 150 }}
      dragElastic={0.25}
      dragMomentum={false}
      onDragStart={() => {
        draggingId.current = id;
        setTopCardId(id);
      }}
      onDragEnd={(_evt: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
        draggingId.current = null;
        animate(x, 0, { type: 'spring', stiffness: 300, damping: 28 });
        animate(y, 0, { type: 'spring', stiffness: 300, damping: 28 });
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
      whileTap={{ cursor: 'grabbing', scale: 1.04 }}
    >
      <div className="card flex flex-col">
        <div className="flex items-start gap-4 p-4 bg-white">
          {item.cardDeckIcon && <Icon icon={item.cardDeckIcon} className="w-8 h-8 shrink-0" />}
          {item.cardDeckHeadline && <h3 className="card-label">{item.cardDeckHeadline}</h3>}
        </div>
        {item.cardDeckDescription && <p className="card-body">{item.cardDeckDescription}</p>}
      </div>
    </motion.div>
  );
};

const chunkCards = (cards: CardItem[], maxPerRow: number): CardItem[][] => {
  const rows: CardItem[][] = [];
  let row = [];
  let count = 0;
  for (let i = 0; i < cards.length; i++) {
    row.push(cards[i]);
    count++;
    if (count === maxPerRow || i === cards.length - 1) {
      rows.push(row);
      count = 0;
      row = [];
      maxPerRow = Math.min(maxPerRow, cards.length - rows.flat().length);
    }
  }
  return rows;
};

const CardDeck: React.FC<CardDeckProps> = ({ cardDeckItem }) => {
  const draggingId = useRef<string | null>(null);
  const [topCardId, setTopCardId] = useState<string | null>(null);
  const [rows, setRows] = useState<CardItem[][]>([]);

  const calculateLayout = () => {
    const viewport = window.innerWidth;
    const maxCards = Math.floor((viewport - SIDE_PADDING) / (CARD_WIDTH - OVERLAP_X)) || 1;
    const chunked = chunkCards(cardDeckItem || [], maxCards);
    setRows(chunked);
  };

  useEffect(() => {
    if (!cardDeckItem) return;
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [cardDeckItem]);

  if (!cardDeckItem || cardDeckItem.length === 0) return null;

  return (
    <section className="w-full py-12 overflow-visible">
      <div className="container mx-auto px-4 max-w-[calc(100vw-32px)]" data-fade>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center items-start relative"
            style={{
              marginTop: rowIndex === 0 ? 0 : -OVERLAP_Y,
              zIndex: 10 - rowIndex,
            }}
          >
            {row.map((item, index) => (
              <div
                key={`${rowIndex}-${index}`}
                style={{ marginLeft: index === 0 ? 0 : `-${OVERLAP_X}px` }}
              >
                <DraggableCard
                  item={item}
                  index={index}
                  draggingId={draggingId}
                  topCardId={topCardId}
                  setTopCardId={setTopCardId}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardDeck;