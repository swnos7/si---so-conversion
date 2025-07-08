// src/components/sections/Suppliers.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { suppliersLogos } from '@/data/content';

const Suppliers = () => {
  const suppliers = suppliersLogos || [];
  const scrollerRef = useRef(null);
  const logoRefs = useRef([]); // Ref for individual logo divs

  // Framer Motion motion value for the horizontal scroll position
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 }); // Smooth spring motion for x

  // --- Configuration ---
  const logoItemWidth = 200; // Expected width of each logo container (including padding/margin). CRITICAL for accuracy.
  const scrollSpeed = 50; // Pixels per second (higher = faster)
  const rotationDegrees = 90; // Degrees for entry/exit rotation (This variable is no longer used for entry rotation)
  const centerZoomScale = 1.2; // Scale factor for the center logo
  const numVisibleLogos = 5; // Approximate number of logos visible at once, helps with triggering animations

  // Duplicate suppliers to ensure enough content for the loop (at least 2-3 times what's visible)
  const duplicatedSuppliers = Array(Math.max(3, Math.ceil(numVisibleLogos * 2.5))).fill(suppliers).flat();

  // Framer Motion variants for individual logo entry/exit and center zoom
  const logoVariants = {
    // Hidden state for elements off-screen or animating out
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 20,
      rotateZ: 0, // Changed to 0 to remove rotation on entry from the right
      transition: { duration: 0.5, ease: "easeOut" }
    },
    // Visible state for elements currently in normal view
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0, // No rotation when visible
      transition: { duration: 0.8, ease: "easeOut" }
    },
    // Exit state for elements moving off-screen
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -20, // Move slightly up as they exit
      rotateZ: rotationDegrees, // Retained rotation for exit on the left side
      transition: { duration: 0.5, ease: "easeIn" }
    },
    // Center state for the zoomed logo
    center: {
      scale: centerZoomScale,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    // Normal state when leaving center
    normal: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // State to store the index of the currently "centered" logo
  const [centeredLogoIndex, setCenteredLogoIndex] = useState(null);

  // --- Core Scroll Animation Loop ---
  const startScrolling = useCallback(() => {
    let animation;
    let currentX = 0; // Tracks the visual position
    let lastTime = performance.now();

    const animateScroll = (timestamp) => {
      if (!scrollerRef.current) return;

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Calculate how much to move based on speed and delta delta
      currentX -= (scrollSpeed / 1000) * deltaTime; // Convert speed to px/ms

      // Loop logic: When the entire track has scrolled past its original width, reset
      if (Math.abs(currentX) >= suppliers.length * logoItemWidth) {
        currentX += suppliers.length * logoItemWidth; // Reset by adding back one set's width
      }

      x.set(currentX); // Update the Framer Motion value

      // Determine the centered logo
      const containerRect = scrollerRef.current.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      let newCenteredIndex = null;
      logoRefs.current.forEach((logoEl, idx) => {
        if (!logoEl) return;
        const logoRect = logoEl.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;

        // Check if logo is approximately in the center
        // Adjust the 'tolerance' (e.g., logoItemWidth / 2) based on how wide your "center zone" is
        if (Math.abs(logoCenterX - containerCenterX) < logoItemWidth / 2) {
          newCenteredIndex = idx;
        }
      });

      if (newCenteredIndex !== centeredLogoIndex) {
        setCenteredLogoIndex(newCenteredIndex);
      }

      animation = requestAnimationFrame(animateScroll);
    };

    animation = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animation); // Cleanup on unmount
  }, [suppliers.length, x, scrollSpeed, logoItemWidth, centeredLogoIndex]);

  useEffect(() => {
    if (suppliers.length > 0) {
      // Initialize x to a position that centers the first few logos well
      x.set(-logoItemWidth * Math.floor(duplicatedSuppliers.length / 2));
      const cleanupScroll = startScrolling();
      return () => cleanupScroll();
    }
  }, [suppliers.length, startScrolling]);

  // --- Render ---
  if (suppliers.length === 0) {
    return (
      <section id="suppliers" className="py-20 bg-black text-gray-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:lg-8">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-16">OUR TRUSTED PARTNERS</h2>
          <p>No supplier logos available. Please add them to src/data/content.js and public/images/suppliers/.</p>
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            Are you a supplier or a specialist trade interested in partnering with us?{" "}
            <a href="#contact" className="text-yellow-500 hover:underline">Get in touch!</a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="suppliers" className="py-20 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">OUR TRUSTED PARTNERS</h2>
          <p className="text-gray-400 text-lg">
            We collaborate with a network of reliable suppliers and specialist trades to ensure excellence in every project.
          </p>
        </div>

        <div className="relative w-full overflow-hidden whitespace-nowrap py-4">
          {/* Enhanced Gradient Fades */}
          <style jsx>{`
            .fade-left {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 15%;
              background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0) 100%);
              z-index: 10;
              pointer-events: none;
            }
            .fade-right {
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 15%;
              background: linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0) 100%);
              z-index: 10;
              pointer-events: none;
            }
          `}</style>

          <motion.div
            ref={scrollerRef}
            className="flex transform-gpu" // Use transform-gpu for performance
            style={{ x: springX }} // Bind Framer Motion's motion value to 'x' transform
          >
            {duplicatedSuppliers.map((supplier, index) => {
              const isBeesley = supplier.alt === 'Beesley';
              const isJewson = supplier.alt === 'Jewson';

              // Define base image style
              let imgStyle = {
                objectFit: 'contain', // Ensures the image scales down to fit without cropping
                width: '120px',   // Desired visual width for the image itself
                height: '80px',  // Desired visual height for the image itself
              };

              // Apply conditional scaling for specific logos
              if (isBeesley) {
                imgStyle.transform = 'scale(0.7)'; // Example: Reduce Beesley to 70% of 120x80
              } else if (isJewson) {
                imgStyle.transform = 'scale(0.9)'; // Example: Reduce Jewson to 90% of 120x80
              }

              return (
                <motion.div
                  key={`${supplier.src}-${index}`} // Unique key for each duplicated item
                  ref={(el) => (logoRefs.current[index] = el)} // Store ref for measurement
                  className="flex-shrink-0 flex flex-col justify-center items-center h-24 p-2 mx-4"
                  style={{ width: `${logoItemWidth - 32}px` }}
                  // Framer Motion animation properties for individual logo
                  variants={logoVariants}
                  initial="hidden"
                  animate={centeredLogoIndex === index ? "center" : "normal"} // Animate to center or normal scale
                  whileInView={logoVariants.visible} // Animate opacity, scale when it enters viewport (rotation removed)
                  exit={logoVariants.exit} // Animate out when leaving viewport (rotation retained for left exit)
                  viewport={{ amount: 0.5 }} // Adjust amount for when to trigger whileInView
                  // No explicit 'transition' delay here; the scroll rate provides the stagger
                >
                  <img
                    src={supplier.src}
                    alt={supplier.alt}
                    style={imgStyle} // Apply the computed image styling here
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x80/000/FFF?text=Error`; }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            Are you a supplier or a specialist trade interested in partnering with us?{" "}
            <a href="#contact" className="text-yellow-500 hover:underline">Get in touch!</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Suppliers;
