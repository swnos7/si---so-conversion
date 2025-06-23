import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company, navLinks } from '@/data/content';
import useScrollspy from '@/hooks/useScrollspy';

const Header = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeId = useScrollspy(navLinks.map(link => link.id), {
    rootMargin: '0% 0% -80% 0%',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (sectionId) => {
    scrollToSection(sectionId);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-4" onClick={() => handleLinkClick('hero')}>
              <img src={company.logoLight} alt={`${company.name} Logo`} className="h-10 w-auto" />
              <span className="font-bold text-xl text-yellow-400 tracking-wider uppercase">{company.name}</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                  activeId === link.id
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="md:hidden flex items-center">
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          className="md:hidden bg-black/90"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeId === link.id ? 'text-yellow-400 bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </Button>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;