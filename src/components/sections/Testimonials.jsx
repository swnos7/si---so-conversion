import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/content.js';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">WHAT OUR CLIENTS SAY</h2>
        </div>

        <div className="relative">
          <div className="text-center min-h-[200px]">
            <p className="text-xl md:text-2xl text-gray-300 italic mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="text-yellow-500 font-semibold">
              - {testimonials[currentTestimonial].author}
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-12">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              Previous
            </Button>
            <Button
              onClick={nextTestimonial}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;