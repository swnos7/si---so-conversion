// src/components/Instagram.jsx

import React, { useEffect, useRef } from 'react';

const Instagram = () => {
  const elfsightContainerRef = useRef(null);

  useEffect(() => {
    // This part remains the same: load the Elfsight platform script once.
    if (!document.querySelector('script[src*="platform.js"]')) {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <section id="instagram-feed-section" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR LATEST WORK</h2>
          <p className="text-gray-400 text-lg">Follow us on Instagram for daily updates!</p>
        </div>

        {/* This div wraps the Elfsight widget.
            We'll use flexbox to ensure its content (the widget) is centered. */}
        <div
          // Added 'flex' and 'justify-center' to center its child (the Elfsight widget)
          // 'max-w-xl' and 'mx-auto' are still good for sizing the *overall* container
          // of the widget, but 'flex justify-center' will align the widget itself.
          className="w-full max-w-xl mx-auto flex justify-center" // ⭐⭐⭐ ADJUSTED CLASSES HERE ⭐⭐⭐
        >
          <div 
            ref={elfsightContainerRef} 
            className="elfsight-app-0c0daa42-3a08-46f9-a8aa-5aa220dbfb17" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;