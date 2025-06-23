import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { galleryItems } from '@/data/content';

const Gallery = ({ onImageClick }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">GALLERY</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Showcasing our finest construction and renovation projects.</p>
        </div>

        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide py-4 -mx-4 px-4"
            whileTap={{ cursor: "grabbing" }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[85%] sm:w-2/3 md:w-1/2 lg:w-1/3"
                onClick={() => onImageClick(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={item.alt} src={item.src} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <span className="text-white font-semibold text-center">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 hidden md:block">
            <Button
              onClick={() => scroll('left')}
              variant="outline"
              size="icon"
              className="bg-black/50 hover:bg-yellow-500/80 text-white hover:text-black rounded-full h-12 w-12 border-yellow-500"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 sm:translate-x-4 hidden md:block">
            <Button
              onClick={() => scroll('right')}
              variant="outline"
              size="icon"
              className="bg-black/50 hover:bg-yellow-500/80 text-white hover:text-black rounded-full h-12 w-12 border-yellow-500"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;