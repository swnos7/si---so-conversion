import React, { useEffect } from 'react';
// Button import is no longer needed as no custom buttons are present
// import { Button } from '@/components/ui/button'; 

const Reviews = () => {
  useEffect(() => {
    // Dynamically create and append the Elfsight script to the body
    // This ensures the script loads after the component is mounted
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.dataset.elfsightAppLazy = true; // Keep the lazy loading attribute if needed
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      // Check if the script exists before trying to remove it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section id="Reviews" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed the custom title "WHAT OUR CLIENTS SAY" */}
        
        {/* Elfsight Google Reviews Widget container */}
        {/* The script loaded by useEffect will find this div and inject the widget here */}
        <div className="elfsight-app-69511ec5-53eb-4e41-ae19-62dae8b6972e"></div>

        {/* Removed the custom "Review Us on Google" button */}
      </div>
    </section>
  );
};
export default Reviews;
