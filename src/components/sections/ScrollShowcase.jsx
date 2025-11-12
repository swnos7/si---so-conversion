import React from 'react';
import ContainerScroll from '@/components/ui/container-scroll-animation';
import { galleryItemsByCategory, galleryItems } from '@/data/content.js';

const bespokeItems = galleryItemsByCategory['bespoke-projects'] || [];
const fallbackItems = bespokeItems.length ? bespokeItems : galleryItems;
const projectImage = fallbackItems[0]?.src || 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80';

const ScrollShowcase = () => (
  <section className="bg-black py-10">
    <ContainerScroll
      titleComponent={
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">Immersive Preview</p>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            A 360° look at <span className="text-yellow-400">signature builds</span>
          </h2>
          <p className="text-lg text-gray-300">
            Scroll to watch how our detail-rich spaces reveal themselves in depth—exactly how clients experience them.
          </p>
        </div>
      }
    >
      <img
        src={projectImage}
        alt="Featured construction showcase"
        className="h-full w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </ContainerScroll>
  </section>
);

export default ScrollShowcase;
