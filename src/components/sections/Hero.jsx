import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, Hammer, HardHat, DraftingCompass, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_HEADING_WORDS = [
  { id: 'raising', text: 'Raising', delay: 0.35 },
  { id: 'dreams', text: 'Dreams', delay: 0.48 },
];

const SUBHEADING_TEXT = 'Building Reality';

const heroIcons = [
  {
    id: 'building',
    Icon: Building2,
    motionDelay: 0.75,
    wrapperClass: 'hero-icon--north',
  },
  {
    id: 'factory',
    Icon: Factory,
    motionDelay: 0.9,
    wrapperClass: 'hero-icon--west',
  },
  {
    id: 'hard-hat',
    Icon: HardHat,
    motionDelay: 1.05,
    wrapperClass: 'hero-icon--east',
  },
  {
    id: 'hammer',
    Icon: Hammer,
    motionDelay: 1.2,
    wrapperClass: 'hero-icon--south',
  },
];

const backgroundIconRows = [
  {
    id: 'ribbon-top',
    direction: 'left',
    delay: 0,
    icons: [DraftingCompass, Building2, Ruler, HardHat, Factory],
  },
  {
    id: 'ribbon-mid',
    direction: 'right',
    delay: 3.5,
    icons: [Hammer, Factory, DraftingCompass, Building2, Ruler],
  },
  {
    id: 'ribbon-bottom',
    direction: 'left',
    delay: 1.8,
    icons: [Ruler, HardHat, Building2, Factory, Hammer],
  },
];

const Hero = ({ scrollToSection }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('/images/bg image/bac.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 hero-shadow pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/60 z-[1]"></div>

      <div className="relative z-[2] w-full max-w-6xl px-4 py-24 lg:py-32 flex flex-col items-center gap-10">
        <div className="hero-ribbons" aria-hidden="true">
          {backgroundIconRows.map(({ id, direction, delay, icons }) => (
            <div
              key={id}
              className={`hero-ribbon hero-ribbon--${direction}`}
              style={{ animationDelay: `${delay}s` }}
            >
              {[...icons, ...icons].map((Icon, index) => (
                <Icon key={`${id}-${index}`} className="hero-ribbon-icon" />
              ))}
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-[440px] sm:max-w-[560px] aspect-square mx-auto hero-orbit">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 320"
            className="hero-triangle"
          >
            <defs>
              <linearGradient id="triangleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="triangleFill" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="rgba(250, 204, 21, 0.08)" />
                <stop offset="65%" stopColor="rgba(250, 204, 21, 0.02)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>
            <polygon
              points="160,40 300,280 20,280"
              fill="url(#triangleFill)"
              stroke="url(#triangleGlow)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-triangle-stroke"
            />
          </svg>

          <div className="hero-counter absolute inset-[13%] sm:inset-[17%] flex flex-col items-center justify-center px-4 text-center gap-6">
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {HERO_HEADING_WORDS.map(({ id, text, delay }, index) => (
                <span
                  key={id}
                  className="hero-heading-word"
                  style={{ animationDelay: `${delay}s`, '--hero-word-index': index }}
                >
                  {text}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="hero-subheading text-lg sm:text-xl md:text-2xl text-yellow-300 font-semibold tracking-wide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {SUBHEADING_TEXT}
            </motion.p>
          </div>

          {heroIcons.map(({ id, Icon, motionDelay, wrapperClass }) => (
            <motion.div
              key={id}
              className={`hero-icon-wrapper ${wrapperClass}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: motionDelay }}
            >
              <div className="hero-icon">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
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
