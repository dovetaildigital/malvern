import React, { useRef, useState, useMemo, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from 'framer-motion'

type HideOn = 'all' | 'mobile' | 'desktop'

interface Item {
  id: string
  src: string
  alt?: string
  label?: string
}

interface DragReorderWrapperProps {
  items: Item[]
  paddingTop?: 'normal' | 'more' | 'less'
  paddingBottom?: 'normal' | 'more' | 'less'
  hideOn?: HideOn
}

const ITEM_WIDTH = 300
const ITEM_HEIGHT = 300
const MOBILE_SPREAD = 8
const DESKTOP_OVERLAP = 120

function hashStringToInt(str: string): number {
  return (
    Array.from(str).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0) >>> 0
  )
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function DraggableCard({
  item,
  index,
  draggingId,
  containerRef,
  zOrder,
  setZOrder,
}: {
  item: Item
  index: number
  draggingId: React.MutableRefObject<string | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  zOrder: string[]
  setZOrder: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const START_DELAY_MS = 1700
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(y, [-80, 80], [-6, 6])
  const controls = useAnimation()

  const seed = useMemo(() => hashStringToInt(item.id), [item.id])
  const randomX = useMemo(() => seededRandom(seed) * 200 - 100, [seed])
  const randomY = useMemo(() => seededRandom(seed + 1) * -200 - 50, [seed])

  // Use isDesktop for rotation difference, but not for stack logic here
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setIsDesktop(window.innerWidth >= 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const randomRotate = useMemo(
    () => (isDesktop ? seededRandom(seed + 2) * 10 - 5 : 0),
    [seed, isDesktop]
  )

  const cardStyle = useMemo(() => {
    const isDragging = draggingId.current === item.id
    return {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      top: 0,
      left: `${index * MOBILE_SPREAD}px`,
      marginLeft: index === 0 ? 0 : -DESKTOP_OVERLAP,
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
      x: 0,
      y: 0,
      rotate: 0,
    } as const
  }, [draggingId.current, index, item.id, zOrder])

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          duration: 0.6,
          type: 'spring',
          stiffness: 120,
        },
      })
    }, START_DELAY_MS)
    return () => clearTimeout(timeout)
  }, [controls, index])

  const handleDragStart = () => {
    draggingId.current = item.id
    setZOrder(prev => [...prev.filter(id => id !== item.id), item.id])
    if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
      window.navigator.vibrate(10)
    }
  }

  const handleDragEnd = () => {
    draggingId.current = null
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 300 },
    })
  }

  const handleTap = () => {
    setZOrder(prev => [...prev.filter(id => id !== item.id), item.id])
    controls.start({ scale: 1.04 }).then(() =>
      controls.start({ scale: 1, transition: { duration: 0.2 } })
    )
  }

  return (
    <motion.div
      initial={{
        x: randomX,
        y: randomY,
        rotate: randomRotate,
        opacity: 0,
      }}
      animate={controls}
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      role="button"
      aria-grabbed={draggingId.current === item.id}
      className="absolute md:relative md:left-auto md:top-auto"
      style={cardStyle}
    >
      <img
        src={item.src}
        alt={item.alt || ''}
        draggable={false}
        className="w-full h-full object-cover"
        onError={e => {
          const tgt = e.target as HTMLImageElement
          tgt.onerror = null
          tgt.src = 'data:image/svg+xml;base64,...'
        }}
      />
      {(item.label || item.alt) && (
        <div className="absolute bottom-2 left-2 px-2 py-1 text-background bg-foreground/50 rounded">
          {item.label || item.alt}
        </div>
      )}
    </motion.div>
  )
}

export default function DragReorderWrapper({
  items,
  paddingTop = 'normal',
  paddingBottom = 'normal',
  hideOn,
}: DragReorderWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingId = useRef<string | null>(null)
  const [zOrder, setZOrder] = useState<string[]>(items.map(i => i.id))

  // Section-level visibility logic
  const showMobile = !hideOn || (hideOn !== 'all' && hideOn !== 'mobile')
  const showDesktop = !hideOn || (hideOn !== 'all' && hideOn !== 'desktop')

  // Padding logic
  const pad = (val?: 'normal' | 'more' | 'less') =>
    val === 'more' ? 48 : val === 'less' ? 8 : 24

  // Render separate sections with proper Tailwind breakpoint classes
  return (
    <>
      {/* Mobile Section */}
      {showMobile && (
        <section className="py-24 md:hidden" style={{ paddingTop: pad(paddingTop), paddingBottom: pad(paddingBottom) }}>
          <div
            ref={containerRef}
            className="relative w-full overflow-x-clip touch-none h-[400px]"
            style={{
              height: ITEM_HEIGHT,
              userSelect: 'none',
            }}
          >
            {items.map((item, i) => {
              const style = {
                position: 'absolute' as const,
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                top: 0,
                left: '50%',
                transform: `translateX(-50%) translateX(${i * MOBILE_SPREAD}px)`,
                zIndex: i,
                borderRadius: 16,
                backgroundColor: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                userSelect: 'none' as const,
              }

              return (
                <motion.div
                  key={item.id}
                  style={style}
                >
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    draggable={false}
                    className="w-full h-full object-cover"
                    onError={e => {
                      const tgt = e.target as HTMLImageElement
                      tgt.onerror = null
                      tgt.src = 'data:image/svg+xml;base64,...'
                    }}
                  />
                  {(item.label || item.alt) && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 text-background bg-foreground/50 rounded">
                      {item.label || item.alt}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Desktop Section */}
      {showDesktop && (
        <section className="py-24 hidden md:block" style={{ paddingTop: pad(paddingTop), paddingBottom: pad(paddingBottom) }}>
          <div
            ref={containerRef}
            className="relative w-full overflow-x-clip touch-none h-[300px]"
            style={{
              height: ITEM_HEIGHT,
              userSelect: 'none',
            }}
          >
            <div className="relative flex justify-center items-center h-full">
              {items.map((item, i) => (
                <DraggableCard
                  key={item.id}
                  item={item}
                  index={i}
                  draggingId={draggingId}
                  containerRef={containerRef}
                  zOrder={zOrder}
                  setZOrder={setZOrder}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
