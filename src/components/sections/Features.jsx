
import React from 'react';
import { features } from '@/data/content.js';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR FEATURES</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Some of the top benefits we deliver with every project.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group p-6 rounded-lg card-hover">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src={feature.icon} alt={`${feature.title} icon`} className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
