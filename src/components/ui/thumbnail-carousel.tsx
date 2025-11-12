import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarouselItem {
  id: string | number;
  src: string;
  title: string;
  description?: string;
}

interface ThumbnailCarouselProps {
  items?: CarouselItem[];
  height?: number;
  className?: string;
  onSelectItem?: (item: CarouselItem, index: number) => void;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 1,
    src: 'https://plus.unsplash.com/premium_photo-1712685912272-96569030d1d7?auto=format&fit=crop&q=80&w=1175',
    title: 'A large body of water surrounded by mountains',
  },
  {
    id: 2,
    src: 'https://plus.unsplash.com/premium_photo-1761478617343-12a3dd981cf6?auto=format&fit=crop&q=80&w=1175',
    title: 'Abstract streaks of pink and blue on black',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=880&h=600&fit=crop',
    title: 'Mountain Summit',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=880&h=600&fit=crop',
    title: 'Alpine Landscape',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=880&h=600&fit=crop',
    title: 'Mountain Range',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=880&h=600&fit=crop',
    title: 'Mountain Wilderness',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=880&h=600&fit=crop',
    title: 'Mountain Trail',
  },
  {
    id: 8,
    src: 'https://plus.unsplash.com/premium_photo-1761940415449-c09ef466c698?auto=format&fit=crop&q=80&w=715',
    title: 'A lone figure on a futuristic reflective surface',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=880&h=600&fit=crop',
    title: 'Rocky Cliffs',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=880&h=600&fit=crop',
    title: 'Forest Path',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=880&h=600&fit=crop',
    title: 'Green Hills',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=880&h=600&fit=crop',
    title: 'Sunrise Peak',
  },
];

const FULL_WIDTH = 120;
const COLLAPSED_WIDTH = 35;
const GAP = 2;
const EDGE_MARGIN = 2;

interface ThumbnailStripProps {
  items: CarouselItem[];
  index: number;
  onSelect: (value: number) => void;
}

const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({ items, index, onSelect }) => {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbnailsRef.current) return;

    let scrollPosition = EDGE_MARGIN;
    for (let i = 0; i < index; i += 1) {
      scrollPosition += COLLAPSED_WIDTH + GAP;
    }

    const containerWidth = thumbnailsRef.current.offsetWidth;
    const centerOffset = containerWidth / 2 - FULL_WIDTH / 2;
    const target = scrollPosition - centerOffset;

    thumbnailsRef.current.scrollTo({
      left: Math.max(0, target),
      behavior: 'smooth',
    });
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="mx-auto w-full max-w-4xl overflow-x-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex h-20 gap-0.5 pb-2 px-6" style={{ width: 'fit-content' }}>
        {items.map((item, i) => (
          <motion.button
            type="button"
            key={item.id}
            onClick={() => onSelect(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH,
                marginLeft: EDGE_MARGIN,
                marginRight: EDGE_MARGIN,
              },
              inactive: {
                width: COLLAPSED_WIDTH,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative h-full shrink-0 overflow-hidden rounded-lg"
            aria-label={`Show thumbnail ${item.title}`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  items,
  height = 420,
  className,
  onSelectItem,
}) => {
  const data = useMemo(() => (items && items.length > 0 ? items : DEFAULT_ITEMS), [items]);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, data.length - 1));
  }, [data.length]);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      animate(x, targetX, {
        type: 'spring',
        stiffness: 320,
        damping: 32,
      });
    }
  }, [index, isDragging, x]);

  const clampIndex = (value: number) => Math.max(0, Math.min(data.length - 1, value));

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    setIsDragging(false);
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = index;

    if (Math.abs(velocity) > 500) {
      newIndex = velocity > 0 ? index - 1 : index + 1;
    } else if (Math.abs(offset) > containerWidth * 0.3) {
      newIndex = offset > 0 ? index - 1 : index + 1;
    }

    setIndex(clampIndex(newIndex));
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    setIndex((prev) => clampIndex(direction === 'prev' ? prev - 1 : prev + 1));
  };

  const handleOpen = (selectedIndex: number) => {
    const current = data[selectedIndex];
    if (current && onSelectItem) {
      onSelectItem(current, selectedIndex);
    }
  };

  if (!data.length) {
    return (
      <div className={cn('rounded-2xl border border-dashed border-gray-600 p-8 text-center', className)}>
        <p className="text-gray-300">No gallery items available.</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-5xl px-4 mx-auto', className)}>
      <div className="flex flex-col gap-4">
        <div
          className="relative overflow-hidden rounded-2xl bg-gray-900/30 shadow-[0_20px_50px_rgba(8,8,8,0.4)]"
          ref={containerRef}
          style={{
            minHeight: height,
            maxHeight: '70vh',
          }}
        >
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            {data.map((item, itemIndex) => (
              <div
                key={item.id}
                className="h-full w-full shrink-0"
                style={{
                  minHeight: height,
                  maxHeight: '70vh',
                }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full cursor-pointer select-none rounded-2xl object-cover"
                    draggable={false}
                    onClick={() => handleOpen(itemIndex)}
                  />
                  {onSelectItem && (
                    <button
                      type="button"
                      onClick={() => handleOpen(itemIndex)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-black/90"
                    >
                      <Maximize2 size={16} />
                      View image
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            disabled={index === 0}
            onClick={() => handleArrowClick('prev')}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition',
              index === 0
                ? 'cursor-not-allowed bg-white/20 text-white/60'
                : 'bg-white text-black hover:scale-105 hover:bg-yellow-400',
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            type="button"
            disabled={index === data.length - 1}
            onClick={() => handleArrowClick('next')}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition',
              index === data.length - 1
                ? 'cursor-not-allowed bg-white/20 text-white/60'
                : 'bg-white text-black hover:scale-105 hover:bg-yellow-400',
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 px-4 py-1 text-sm font-medium text-white">
            {index + 1} / {data.length}
          </div>
        </div>

        <div className="px-2">
          <ThumbnailStrip items={data} index={index} onSelect={setIndex} />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
