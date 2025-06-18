import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { ParsedStackItem } from '@/types/imagestack';

const STACK_OFFSET_Y = 10;
const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;
const OVERLAP = 100;

function DraggableCard({
  item,
  index,
  draggingId,
  containerRef,
  topCardId,
  setTopCardId
}: {
  item: ParsedStackItem;
  index: number;
  draggingId: React.MutableRefObject<string | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  topCardId: string | null;
  setTopCardId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-80, 80], [-6, 6]);

  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * -200 - 50;
  const randomRotate = Math.random() * 30 - 15;

  const handleDragStart = () => {
    draggingId.current = item.id;
    setTopCardId(item.id);
  };

  const handleDragEnd = () => {
    draggingId.current = null;
  };

  return (
    <motion.div
      initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0 }}
      animate={{
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          duration: 0.6,
          type: "spring",
          stiffness: 120,
        },
      }}
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
      style={{
        x,
        y,
        rotate,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        position: "absolute",
        left: index * (ITEM_WIDTH - OVERLAP),
        zIndex:
          topCardId === item.id
            ? 999
            : draggingId.current === item.id
            ? 998
            : index + 1,
        borderRadius: 16,
        backgroundColor: "white",
        boxShadow:
          draggingId.current === item.id
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
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YzY4N2IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==";
        }}
      />
      {(item.label || item.alt) && (
        <div className="w-full py-2 px-2 absolute bottom-2 left-2 strapline text-white text-xl">
          {item.label || item.alt}
        </div>
      )}
    </motion.div>
  );
}

export default function DragReorderWrapper({ items }: { items: ParsedStackItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<string | null>(null);
  const [topCardId, setTopCardId] = useState<string | null>(null);
  const totalWidth = items.length * ITEM_WIDTH - (items.length - 1) * OVERLAP;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: ITEM_HEIGHT + 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        margin: "0 auto",
        marginTop: "-10vh",
        userSelect: "none",
      }}
      className="touch-none"
    >
      <div
        style={{
          transform: `translateY(${STACK_OFFSET_Y}px)`,
          position: "relative",
          width: `${totalWidth}px`,
          maxWidth: "100%",
          height: "100%",
        }}
      >
        {items.map((item, index) => (
          <DraggableCard
            key={item.id}
            item={item}
            index={index}
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
