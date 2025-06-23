import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GalleryModal = ({ galleryItems, currentIndex, onClose, onNext, onPrev }) => {
  const [[_page, direction], _setPage] = React.useState([0, 0]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  if (currentIndex === null) {
    return null;
  }

  const image = galleryItems[currentIndex];
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          variant="outline"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-500/80 text-white hover:text-black rounded-full h-12 w-12 border-yellow-500 z-20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={image.src}
            alt={image.alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-yellow-500/10 z-10"
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        <Button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          variant="outline"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-yellow-500/80 text-white hover:text-black rounded-full h-12 w-12 border-yellow-500 z-20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 bg-yellow-500 text-black rounded-full p-2 hover:bg-yellow-400 transition-colors shadow-lg z-20"
          aria-label="Close image viewer"
        >
          <X size={28} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GalleryModal;