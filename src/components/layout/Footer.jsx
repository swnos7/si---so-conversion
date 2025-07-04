
import React from 'react';
import { company, socialLinks } from '@/data/content';
import { Facebook, Instagram, MessageCircle, Mail } from 'lucide-react';

const iconMap = {
  Facebook: <Facebook className="h-6 w-6" />,
  Instagram: <Instagram className="h-6 w-6" />,
  WhatsApp: <MessageCircle className="h-6 w-6" />,
  Email: <Mail className="h-6 w-6" />,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-yellow-500/20 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="mb-4">
              <img src={company.logoLight} alt={`${company.name} Logo`} className="h-12 w-auto" />
            </a>
            <p className="max-w-xs">{company.name}</p>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider mb-4">Contact Info</p>
            <ul className="space-y-2">
              <li><a href={`tel:${company.phone1}`} className="hover:text-yellow-400 transition-colors">{company.phone1}</a></li>
              <li><a href={`tel:${company.phone2}`} className="hover:text-yellow-400 transition-colors">{company.phone2}</a></li>
              <li><a href={`mailto:${company.email}`} className="hover:text-yellow-400 transition-colors">{company.email}</a></li>
              <li>{company.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider mb-4">Our Contacts</p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {iconMap[link.icon]}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {currentYear} {company.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
