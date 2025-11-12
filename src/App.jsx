
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Instagram from '@/components/sections/Instagram';
import Reviews from '@/components/sections/Reviews';
import Team from '@/components/sections/Team';
import Contact from '@/components/sections/Contact';
import Suppliers from '@/components/sections/Suppliers';
import FixedBookingButton from '@/components/sections/FixedBookingButton';
import DotScreenShader from '@/components/ui/dot-shader-background';
import GalleryModal from '@/components/ui/GalleryModal';
import { galleryItems, galleryItemsByCategory } from '@/data/content';

const SectionWrapper = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [currentGalleryItems, setCurrentGalleryItems] = React.useState(galleryItems);
  const [activeCategory, setActiveCategory] = React.useState('all');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    let newItems;
    if (categoryId === 'all') {
      const allItems = [];
      Object.values(galleryItemsByCategory).forEach((categoryItems) => {
        allItems.push(...categoryItems);
      });
      newItems = allItems.length > 0 ? allItems : galleryItems;
    } else {
      newItems = galleryItemsByCategory[categoryId] || [];
    }
    setCurrentGalleryItems(newItems);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % currentGalleryItems.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length);
  };

  return (
    <>
      <Helmet>
        <title>Si & So Conversions - Professional Construction & Home Conversions</title>
        <meta name="description" content="Transform your home with Si & So Conversions. Expert loft conversions, home extensions, refurbishments, and construction services. Quality workmanship guaranteed." />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Helmet>

      <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-55">
          <DotScreenShader />
        </div>
        <Header scrollToSection={scrollToSection} />
        
        <main>
          <Hero scrollToSection={scrollToSection} />
          <SectionWrapper><Features /></SectionWrapper>
          <SectionWrapper><About /></SectionWrapper>
          <SectionWrapper><Suppliers /></SectionWrapper>
          <SectionWrapper><Services /></SectionWrapper>
          <SectionWrapper>
            <Gallery onImageClick={handleImageClick} onCategoryChange={handleCategoryChange} />
          </SectionWrapper>
          <SectionWrapper><Instagram /></SectionWrapper>
          <SectionWrapper><Reviews /></SectionWrapper>
          <SectionWrapper><Team /></SectionWrapper>
          <SectionWrapper><Contact /></SectionWrapper>
        </main>

        <Footer />
        <FixedBookingButton />
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <GalleryModal
              galleryItems={currentGalleryItems}
              currentIndex={selectedImageIndex}
              onClose={() => setSelectedImageIndex(null)}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;
