
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { whyChooseUs } from '@/data/content';

const About = () => {
  return (
    <section id="about" className="py-20 bg-black-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="images/logo/logo%20Si&So.svg" alt="Construction team working on a project" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">ABOUT US</h2>
            <p className="text-lg text-gray-300 mb-6">
              With over 15 years of industry experience, SI & SO Conversions stands as a beacon of quality and reliability in the construction sector. We are a team of dedicated professionals committed to turning your vision into reality.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Our core values are transparency, excellence, and client satisfaction. We handle every project, big or small, with the same level of passion and precision.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
