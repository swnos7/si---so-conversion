
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { galleryCategories, galleryItemsByCategory, galleryItems } from '@/data/content';

const Gallery = ({ onImageClick, onCategoryChange }) => {
  const scrollContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

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

  const getCurrentGalleryItems = () => {
    if (activeCategory === 'all') {
      // Combine all category items for 'all' view
      const allItems = [];
      Object.values(galleryItemsByCategory).forEach(categoryItems => {
        allItems.push(...categoryItems);
      });
      return allItems.length > 0 ? allItems : galleryItems; // Fallback to legacy items
    }
    return galleryItemsByCategory[activeCategory] || [];
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Reset scroll position when changing category
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    // Notify parent component about category change for modal handling
    if (onCategoryChange) {
      onCategoryChange(categoryId, getCurrentGalleryItems());
    }
  };

  const currentItems = getCurrentGalleryItems();

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">GALLERY</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Showcasing our finest construction and renovation projects.</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                    : 'bg-transparent border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide py-4 -mx-4 px-4"
            whileTap={{ cursor: "grabbing" }}
            key={activeCategory} // Force re-render when category changes
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[85%] sm:w-2/3 md:w-1/2 lg:w-1/3"
                onClick={() => onImageClick(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] w-full">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={item.alt} 
                    src={item.src} 
                  />
                </div>
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

        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects available for this category yet.</p>
            <p className="text-gray-500 text-sm mt-2">Add images to the corresponding folder in public/images/gallery/</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;