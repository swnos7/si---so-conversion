
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { galleryCategories, galleryItemsByCategory, galleryItems } from '@/data/content';
import SphereImageGrid from '@/components/ui/img-sphere';
import ThumbnailCarousel from '@/components/ui/thumbnail-carousel';

const Gallery = ({ onImageClick, onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('bespoke-projects'); // Default category
  const [sphereSize, setSphereSize] = useState(420);

  const getGalleryItemsForCategory = (categoryId) => {
    if (categoryId === 'all') {
      const allItems = [];
      Object.values(galleryItemsByCategory).forEach((categoryItems) => {
        allItems.push(...categoryItems);
      });
      return allItems.length > 0 ? allItems : galleryItems;
    }
    return galleryItemsByCategory[categoryId] || galleryItems;
  };

  const handleCategoryChange = (categoryId) => {
    const updatedItems = getGalleryItemsForCategory(categoryId);
    setActiveCategory(categoryId);
    // Notify parent component about category change for modal handling
    if (onCategoryChange) {
      onCategoryChange(categoryId, updatedItems);
    }
  };

  const currentItems = useMemo(
    () => getGalleryItemsForCategory(activeCategory),
    [activeCategory],
  );
  const sphereImages = useMemo(
    () =>
      currentItems.map((item, index) => ({
        id: `${activeCategory}-${index}`,
        src: item.src,
        alt: item.alt || item.title || 'Gallery image',
        title: item.title,
      })),
    [activeCategory, currentItems],
  );
  const carouselItems = useMemo(
    () =>
      currentItems.map((item, index) => ({
        id: item.id || `${activeCategory}-carousel-${index}`,
        src: item.src,
        title: item.title || `Project ${index + 1}`,
        description: item.description,
      })),
    [activeCategory, currentItems],
  );
  const activeCategoryLabel =
    galleryCategories.find((category) => category.id === activeCategory)?.label || 'Gallery';

  useEffect(() => {
    const calculateSphereSize = () => {
      if (typeof window === 'undefined') return 360;
      if (window.innerWidth < 640) return 280;
      if (window.innerWidth < 1024) return 360;
      if (window.innerWidth < 1280) return 420;
      return 520;
    };

    const handleResize = () => {
      setSphereSize(calculateSphereSize());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        <div className="mb-12 rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-transparent to-black/60 p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            <div className="flex justify-center">
              <SphereImageGrid
                images={sphereImages}
                containerSize={sphereSize}
                sphereRadius={Math.round(sphereSize * 0.38)}
                dragSensitivity={0.8}
                momentumDecay={0.95}
                maxRotationSpeed={6}
                baseImageScale={0.15}
                hoverScale={1.25}
                autoRotate
                autoRotateSpeed={0.25}
                className="mx-auto"
                onSelectImage={onImageClick ? (_image, index) => onImageClick(index) : undefined}
              />
            </div>
            <div className="text-left lg:text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500 mb-3">
                Immersive Preview
              </p>
              <h3 className="text-3xl font-bold text-white">{activeCategoryLabel}</h3>
              <p className="mt-4 text-gray-300">
                Drag, flick or tap the sphere to explore highlights from the{' '}
                {activeCategoryLabel.toLowerCase()} category. Each photo opens in a spotlight modal
                for a closer look, making it easy to brief clients by service type.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li>• Auto-rotates through featured shots for passive viewing</li>
                <li>• Momentum physics and collision detection keep it smooth</li>
                <li>• Works with touch controls, perfect for on-site walk-throughs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          {carouselItems.length > 0 ? (
            <ThumbnailCarousel
              items={carouselItems}
              className="mx-auto"
              onSelectItem={onImageClick ? (_item, index) => onImageClick(index) : undefined}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects available for this category yet.</p>
              <p className="text-gray-500 text-sm mt-2">Add images to the corresponding folder in public/images/gallery/</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
