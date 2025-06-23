import React from 'react';
import { services } from '@/data/content.js';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR SERVICES</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Professional construction services tailored to your needs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center group p-8 rounded-lg card-hover border border-yellow-500/10"
            >
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src={service.icon} alt={`${service.title} icon`} className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;