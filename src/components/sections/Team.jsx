
import React from 'react';
import { directors } from '@/data/content';
import { Mail, Phone } from 'lucide-react';
import { CometCard } from '@/components/ui/comet-card';

const Team = () => {
  return (
    <section id="team" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">MEET OUR DIRECTORS</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">The experienced leadership guiding our success.</p>
        </div>

        <div className="mx-auto grid max-w-5xl place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {directors.map((director, index) => (
            <CometCard key={index} className="group w-full max-w-sm">
              <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-black p-6 backdrop-blur">
                <div className="relative mb-6 flex h-64 items-center justify-center overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={director.image}
                    alt={`Photo of ${director.name}`}
                    className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">{director.name}</h3>
                  <p className="text-yellow-300 text-sm uppercase tracking-widest mt-1">{director.title}</p>
                  <div className="mt-6 space-y-3 text-sm text-gray-300">
                    <a
                      href={`mailto:${director.email}`}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-yellow-400 hover:text-yellow-300"
                    >
                      <Mail className="h-4 w-4" />
                      {director.email}
                    </a>
                    <a
                      href={`tel:${director.phone}`}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-yellow-400 hover:text-yellow-300"
                    >
                      <Phone className="h-4 w-4" />
                      {director.phone}
                    </a>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3 text-xs text-white/60">
                  <span className="h-1 w-1 rounded-full bg-yellow-400" />
                  {director.experience || 'Leadership • Strategy • Execution'}
                </div>
              </div>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
