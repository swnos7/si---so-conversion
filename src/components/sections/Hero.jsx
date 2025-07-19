import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = ({ scrollToSection }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className="relative z-10 p-4">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         Raising Dreams
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-yellow-400 font-medium mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building Reality
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-yellow-500 text-black font-bold text-lg px-8 py-6 rounded-md hover:bg-yellow-400 transition-transform hover:scale-105"
            onClick={() => scrollToSection('contact-form-section')}
          >
            GET A FREE QUOTE
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;