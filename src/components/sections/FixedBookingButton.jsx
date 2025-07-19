// src/components/FixedBookingButton.jsx (or wherever you store your components)

import React, { useEffect, useRef } from 'react';

const FixedBookingButton = () => {
  const elfsightContainerRef = useRef(null);

  useEffect(() => {
    // Only inject the script if the container exists and the script hasn't been added yet
    if (elfsightContainerRef.current && !document.querySelector('script[src*="platform.js"]')) {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script); // Append to body for global access

      // Clean up the script if the component unmounts (optional but good practice for SPA)
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    // This div is where Elfsight will inject the actual button/widget
    // Apply fixed positioning and styling directly here or via a CSS class
    <div
      ref={elfsightContainerRef}
      className="elfsight-app-e4353190-ea17-45c1-bb9b-6b2698d3bc1d"
      data-elfsight-app-lazy
      style={{
        position: 'fixed',
        bottom: '20px',    // Adjust these values to position the button
        right: '20px',     // e.g., bottom-left, top-right
        zIndex: 1000,      // Ensure it's above other content
        // You might need to add specific width/height if the button itself doesn't
        // appear correctly without it, but Elfsight usually handles this.
      }}
    ></div>
  );
};

export default FixedBookingButton;