// src/components/Contact.jsx

import React, { useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { company } from '@/data/content.js';
import { MapPin, Phone, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';

const LiveMap = lazy(() => import('@/components/ui/LiveMap'));

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ytnblvt',         // Your service ID
        'template_8zb13yr',        // Your template ID
        e.target,                  // The form element
        '1-7PLDY0SMUXr2on6'        // Your public key
      )
      .then(
        (result) => {
          toast({ title: '✅ Message sent successfully!' });
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          toast({ title: '❌ Failed to send message.', description: error.text });
        }
      );
  };

  // Corrected directionsUrl (example for Manchester, UK)
  // You should replace 'Salford M50 2GR, United Kingdom' with your exact address for accuracy
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(company.address || "Salford M50 2GR, United Kingdom")}`;


  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">FIND US</h2>
          <p className="text-gray-400 text-lg">Visit our office or get in touch for a project consultation.</p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-800 h-80 rounded-lg overflow-hidden">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading map...</div>}>
              <LiveMap />
            </Suspense>
          </div>
        </div>

        <div className="text-center mb-16">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500"
          >
            GET DIRECTIONS
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Add the ID here for the form section */}
          <div id="contact-form-section"> {/* <--- THIS IS THE NEW ID */}
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">GET IN TOUCH</h3>
            <p className="text-gray-400 mb-8">
              Please fill out the form below to send us an email and we will get back to you as soon as possible.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-yellow-500/30 rounded focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-yellow-500/30 rounded focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Use this space to tell us about your project.
- Type of work: [e.g. loft conversion, kitchen renovation]  
- Property location: [postcode or area]  
- Additional notes: [brief project details]"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-transparent border border-yellow-500/30 rounded focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 resize-none"
                required
              ></textarea>
              <Button
                type="submit"
                className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-full font-bold transition-all duration-300"
              >
                SEND MESSAGE
              </Button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0 text-yellow-500" />
                <div>
                  <p className="font-semibold text-white mb-1">Address</p>
                  <p className="text-gray-400">{company.address.split(',').map((line, i) => <span key={i}>{line.trim()}<br /></span>)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0 text-yellow-500" />
                <div>
                  <p className="font-semibold text-white mb-1">Phone</p>
                  <p className="text-gray-400">{company.phone1}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0 text-yellow-500" />
                <div>
                  <p className="font-semibold text-white mb-1">Email</p>
                  <p className="text-gray-400">{company.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;