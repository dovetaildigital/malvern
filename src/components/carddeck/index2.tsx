// src/components/DragReorderWrapper.tsx
import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";

interface Item {
  id: string;
  src: string;
  alt?: string;
  label?: string;
}

const STACK_OFFSET_Y = 10;
const ITEM_WIDTH    = 300;
const ITEM_HEIGHT   = 300;
const OVERLAP       = 100;

// Simple hash → integer
function hashStringToInt(str: string): number {
  return (
    Array.from(str).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0) >>> 0
  );
}

// Sin-based, reproducible “random” [0,1)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function DraggableCard({
  item,
  index,
  draggingId,
  containerRef,
  topCardId,
  setTopCardId,
}: {
  item: Item;
  index: number;
  draggingId: React.MutableRefObject<string | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  topCardId: string | null;
  setTopCardId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  // Motion values
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const rotate = useTransform(y, [-80, 80], [-6, 6]);

  // Controls for “fly-in” animation
  const controls = useAnimation();

  // Deterministic “random” offsets
  const seed         = useMemo(() => hashStringToInt(item.id), [item.id]);
  const randomX      = useMemo(() => seededRandom(seed)   * 200 - 100, [seed]);
  const randomY      = useMemo(() => seededRandom(seed + 1) * -200 - 50, [seed]);
  const randomRotate = useMemo(() => seededRandom(seed + 2) * 30  - 15, [seed]);

  
  // Fly into place once on mount
  useEffect(() => {
    controls.start({
      x:        0,
      y:        0,
      rotate:   0,
      opacity:  1,
      transition: {
        delay:     index * 0.1,
        duration:  0.6,
        type:      "spring",
        stiffness: 120,
      },
    });
  }, [controls, index]);

  const handleDragStart = () => {
    draggingId.current = item.id;
    setTopCardId(item.id);
  };
  const handleDragEnd = () => {
    draggingId.current = null;
    // x & y stay at their dragged values
  };

  return (
    <motion.div
      initial={{
        x:       0,
        y:       0,
        rotate:  0,
        opacity: 1,
      }}
      animate={controls}
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{
        scale: 1.015,
        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ cursor: "grabbing", scale: 1.04 }}
      // In the DraggableCard component, update the style prop:
style={{
  x, y, rotate,
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
  position: "relative",  // Changed from "absolute"
  marginLeft: index === 0 ? 0 : -OVERLAP,  // Overlap cards
  zIndex: topCardId === item.id
    ? 50
    : draggingId.current === item.id
    ? 49
    : index + 1,
  borderRadius: 16,
  backgroundColor: "white",
  boxShadow: draggingId.current === item.id
    ? "0 25px 50px rgba(0,0,0,0.35)"
    : "0 10px 20px rgba(0,0,0,0.15)",
  overflow: "hidden",
  touchAction: "none",
  userSelect: "none",
  display: "flex",
  flexDirection: "column",
  transition: "box-shadow 0.2s ease",
}}
    >
      <img
        src={item.src}
        alt={item.alt || ""}
        draggable={false}
        className="w-full h-full object-cover"
        onError={(e) => {
          const tgt = e.target as HTMLImageElement;
          tgt.onerror = null;
          tgt.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0i…";
        }}
      />
      {(item.label || item.alt) && (
        <div className="absolute bottom-2 left-2 px-2 py-1 text-white text-xl">
          {item.label || item.alt}
        </div>
      )}
    </motion.div>
  );
}

export default function DragReorderWrapper({
  items,
}: {
  items: Item[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingId   = useRef<string | null>(null);
  const [topCardId, setTopCardId] = useState<string | null>(null);

  // Total width of the stack
  const totalWidth = items.length * ITEM_WIDTH - (items.length - 1) * OVERLAP;

  return (
    // In the DragReorderWrapper component, update the styles:
<div
  ref={containerRef}
  style={{
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",  // Center horizontally
    alignItems: "center",     // Center vertically
    userSelect: "none",
  }}
  className="touch-none"
>
  <div
    style={{
      position: "relative",
      width: "fit-content",  // Only take up as much space as needed
      height: "100%",
      display: "flex",
      alignItems: "center",  // Center cards vertically
    }}
  >
    {items.map((item, i) => (
      <DraggableCard
        key={item.id}
        item={item}
        index={i}
        draggingId={draggingId}
        containerRef={containerRef}
        topCardId={topCardId}
        setTopCardId={setTopCardId}
      />
    ))}
  </div>
</div>
  );
}
