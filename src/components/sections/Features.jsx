
import React from 'react';
import { features } from '@/data/content.js';
import { CometCard } from '@/components/ui/comet-card';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR FEATURES</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Some of the top benefits we deliver with every project.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <CometCard key={index} className="w-full">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-black p-6 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-400/70 bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-300 shadow-[0_12px_28px_rgba(250,204,21,0.25)]">
                  <img
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    className="h-10 w-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-4 text-sm text-gray-300">{feature.description}</p>
              </div>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
