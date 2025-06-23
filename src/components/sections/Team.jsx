
import React from 'react';
import { directors } from '@/data/content';
import { Mail, Phone } from 'lucide-react';

const Team = () => {
  return (
    <section id="team" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">MEET OUR DIRECTORS</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">The experienced leadership guiding our success.</p>
        </div>

        <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
          {directors.map((director, index) => (
            <div
              key={index}
              className="group w-full max-w-sm bg-black-900 rounded-lg overflow-hidden text-center card-hover border border-yellow-500/20"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={director.image} 
                  alt={`Photo of ${director.name}`} 
                  className="w-full h-full object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{director.name}</h3>
                <p className="text-yellow-400 font-medium mb-4">{director.title}</p>
                <div className="flex flex-col items-center space-y-2 text-gray-400">
                  <a href={`mailto:${director.email}`} className="flex items-center space-x-2 hover:text-yellow-400">
                    <Mail className="w-4 h-4" />
                    <span>{director.email}</span>
                  </a>
                  <a href={`tel:${director.phone}`} className="flex items-center space-x-2 hover:text-yellow-400">
                    <Phone className="w-4 h-4" />
                    <span>{director.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
