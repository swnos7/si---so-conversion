import React from 'react';
import { services } from '@/data/content.js';
import { CometCard } from '@/components/ui/comet-card';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR SERVICES</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Professional construction services tailored to your needs.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <CometCard key={index} className="w-full">
              <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-black p-6 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/70 bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-300 shadow-[0_15px_35px_rgba(250,204,21,0.35)]">
                  <img
                    src={service.icon}
                    alt={`${service.title} icon`}
                    className="h-12 w-12 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-sm text-gray-300">{service.description}</p>
              </div>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
