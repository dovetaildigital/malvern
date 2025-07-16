import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from 'framer-motion';

type HideOn = 'all' | 'mobile' | 'desktop';

interface Item {
  id: string;
  src: string;
  alt?: string;
  label?: string;
}

interface DragReorderWrapperProps {
  items: Item[];
  paddingTop?: 'normal' | 'more' | 'less';
  paddingBottom?: 'normal' | 'more' | 'less';
  hideOn?: HideOn;
}

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;
const MOBILE_SPREAD = 8;
const DESKTOP_OVERLAP = 120;

function hashStringToInt(str: string): number {
  return (
    Array.from(str).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0) >>> 0
  );
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface DraggableCardProps {
  item: Item;
  index: number;
  draggingId: React.MutableRefObject<string | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  zOrder: string[];
  setZOrder: React.Dispatch<React.SetStateAction<string[]>>;
  isDesktop: boolean;
  items: Item[];
}

function DraggableCard({
  item,
  index,
  draggingId,
  containerRef,
  zOrder,
  setZOrder,
  isDesktop,
  items,
}: DraggableCardProps) {
  const START_DELAY_MS = 1700;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-20, 20], [-2, 2]);
  const controls = useAnimation();

  const seed = useMemo(() => hashStringToInt(item.id), [item.id]);
  const randomX = useMemo(() => seededRandom(seed) * 200 - 100, [seed]);
  const randomY = useMemo(() => seededRandom(seed + 1) * -200 - 50, [seed]);
  const randomRotate = useMemo(
    () => (isDesktop ? seededRandom(seed + 2) * 10 - 5 : 0),
    [seed, isDesktop]
  );

  const cardIndex = zOrder.indexOf(item.id);
  const midIndex = (zOrder.length - 1) / 2;
  const offsetX = (cardIndex - midIndex) * DESKTOP_OVERLAP;

  const isDragging = draggingId.current === item.id;
  const initialX = isDesktop
    ? randomX
    : index * MOBILE_SPREAD - (items.length * MOBILE_SPREAD) / 2;
  const initialY = isDesktop ? randomY : 0;

  const cardStyle = {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    zIndex: zOrder.indexOf(item.id) + 1,
    borderRadius: 16,
    backgroundColor: 'white',
    boxShadow: isDragging
      ? '0 25px 50px rgba(0,0,0,0.35)'
      : '0 10px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    touchAction: 'none' as const,
    userSelect: 'none' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    transition: 'box-shadow 0.2s ease',
    position: 'relative' as const,
    marginLeft: isDesktop && index !== 0 ? -DESKTOP_OVERLAP : 0,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({
        x: 0,
        y: 0,
        rotate: isDesktop ? randomRotate : 0,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          duration: 0.6,
          type: 'spring',
          stiffness: 120,
        },
      });
    }, START_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [controls, index, isDesktop, randomRotate]);

  const handleDragStart = () => {
    draggingId.current = item.id;
    setZOrder(prev => [...prev.filter(id => id !== item.id), item.id]);
    if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
      window.navigator.vibrate(10);
    }
  };

  const handleDragEnd = () => {
    draggingId.current = null;
    controls.start({
      x: 0,
      y: 0,
      rotate: isDesktop ? randomRotate : 0,
      transition: { type: 'spring', stiffness: 300 },
    });
  };

  const handleTap = () => {
    setZOrder(prev => [...prev.filter(id => id !== item.id), item.id]);
    controls.start({ scale: 1.04 }).then(() =>
      controls.start({ scale: 1, transition: { duration: 0.2 } })
    );
  };

  return (
    <motion.div
      initial={{
        x: initialX,
        y: initialY,
        rotate: isDesktop ? randomRotate : 0,
        opacity: 0,
      }}
      animate={controls}
      drag={isDesktop}
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      role="button"
      aria-grabbed={draggingId.current === item.id}
      className="absolute"
      style={cardStyle}
    >
      <img
        src={item.src}
        alt={item.alt || ''}
        draggable={false}
        className="w-full h-full object-cover"
      />
      {(item.label || item.alt) && (
        <div className="absolute bottom-2 left-2 px-2 py-1 text-background bg-foreground/50 rounded">
          {item.label || item.alt}
        </div>
      )}
    </motion.div>
  );
}

export default function DragReorderWrapper({
  items,
  paddingTop = 'normal',
  paddingBottom = 'normal',
  hideOn,
}: DragReorderWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [zOrder, setZOrder] = useState<string[]>(items.map(i => i.id));
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (active) {
          const newIndex = Number(active.target.getAttribute('data-index'));
          setActiveIndex(newIndex);
        }
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  const pad = (val?: 'normal' | 'more' | 'less') =>
    val === 'more' ? 48 : val === 'less' ? 8 : 24;

  const isVisible = (!hideOn || (hideOn !== 'all' && hideOn !== 'mobile')) && !isDesktop;

  return (
    <section
      className="relative"
      style={{
        paddingTop: pad(paddingTop),
        paddingBottom: pad(paddingBottom),
        display:
          (isVisible || (hideOn !== 'all' && hideOn !== 'desktop' && isDesktop))
            ? 'block'
            : 'none',
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full overflow-visible touch-none mx-auto"
        style={{
          height: isDesktop ? ITEM_HEIGHT : 'auto',
          userSelect: 'none',
          width: isDesktop ? 'auto' : `${ITEM_WIDTH + MOBILE_SPREAD}px`,
        }}
      >
        {isDesktop ? (
          <div className="relative h-full flex justify-center items-center">
            {items.map((item, i) => (
              <DraggableCard
                key={item.id}
                item={item}
                index={i}
                draggingId={draggingId}
                containerRef={containerRef}
                zOrder={zOrder}
                setZOrder={setZOrder}
                isDesktop={isDesktop}
                items={items}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-12 relative">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const scaleClass = isActive ? '' : '';

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={`sticky top-24 z-[${10 + index}] transition-transform duration-500 ease-in-out ${scaleClass}`}
                  style={{
                    height: ITEM_HEIGHT,
                    width: ITEM_WIDTH,
                    margin: '0 auto',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    className="w-full h-full object-cover rounded-lg shadow"
                  />
                  {(item.label || item.alt) && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 text-background bg-foreground/50 rounded">
                      {item.label || item.alt}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
