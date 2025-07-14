// src/components/sections/Suppliers.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { suppliersLogos } from '@/data/content';

const Suppliers = () => {
  const suppliers = suppliersLogos || [];
  const scrollerRef = useRef(null);
  const logoRefs = useRef([]); // Ref for individual logo divs

  // Framer Motion motion value for the horizontal scroll position
  const x = useMotionValue(0);

  const [itemWidth, setItemWidth] = useState(0);

  // --- Configuration ---
  const scrollSpeed = 50; // Pixels per second (higher = faster)
  const centerZoomScale = 1.2; // Scale factor for the center logo

  // Duplicate suppliers to create a seamless loop. Using 3 copies is robust for various screen sizes.
  const duplicatedSuppliers = [...suppliers, ...suppliers, ...suppliers];

  // Framer Motion variants for individual logo entry/exit and center zoom
  const logoVariants = {
    // Center state for the zoomed logo
    center: {
      scale: centerZoomScale,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    // Normal state when leaving center
    normal: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // State to store the index of the currently "centered" logo
  const [centeredLogoIndex, setCenteredLogoIndex] = useState(null);

  // Effect to measure the width of a single logo item after it renders
  useEffect(() => {
    if (logoRefs.current[0]) {
      const firstLogo = logoRefs.current[0];
      const style = window.getComputedStyle(firstLogo);
      const marginRight = parseFloat(style.marginRight);
      const marginLeft = parseFloat(style.marginLeft);
      // getBoundingClientRect().width includes padding and border due to box-sizing
      const fullWidth = firstLogo.getBoundingClientRect().width + marginLeft + marginRight;
      setItemWidth(fullWidth);
    }
  }, [suppliers.length]);

  // --- Core Infinite Scroll Animation ---
  useEffect(() => {
    if (!scrollerRef.current || suppliers.length === 0 || itemWidth === 0) return;

    // The total width of a single set of logos
    const singleSetWidth = suppliers.length * itemWidth;

    // The animation will move the scroller from x=0 to x=-singleSetWidth.
    // Because the content is duplicated, when it loops back to x=0, it appears seamless.
    const animation = animate(x, -singleSetWidth, {
      ease: "linear",
      duration: singleSetWidth / scrollSpeed,
      repeat: Infinity,
      repeatType: "loop", // "loop" resets the animation to the start value
    });

    // Cleanup function to stop the animation when the component unmounts
    return () => animation.stop();
  }, [suppliers.length, x, scrollSpeed, itemWidth]);

  // --- Centered Logo Detection ---
  useEffect(() => {
    let animationFrameId;
    let lastCenteredIndex = null;

    const findCenteredLogo = () => {
      if (!scrollerRef.current || !scrollerRef.current.parentElement) {
        animationFrameId = requestAnimationFrame(findCenteredLogo);
        return;
      };

      const containerRect = scrollerRef.current.parentElement.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      let newCenteredIndex = null;
      let smallestDistance = Infinity;

      logoRefs.current.forEach((logoEl, idx) => {
        if (!logoEl) return;
        const logoRect = logoEl.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const distance = Math.abs(logoCenterX - containerCenterX);

        // Find the logo closest to the center
        if (distance < smallestDistance) {
          smallestDistance = distance;
          // Check if it's within the "center zone" (half the item width)
          if (distance < itemWidth / 2) {
            newCenteredIndex = idx;
          }
        }
      });

      if (newCenteredIndex !== lastCenteredIndex) {
        setCenteredLogoIndex(newCenteredIndex);
        lastCenteredIndex = newCenteredIndex;
      }

      animationFrameId = requestAnimationFrame(findCenteredLogo);
    };

    animationFrameId = requestAnimationFrame(findCenteredLogo);

    return () => cancelAnimationFrame(animationFrameId);
  }, [itemWidth]); // Rerun if the item width changes

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
            style={{ x }} // Bind Framer Motion's motion value to 'x' transform
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
                  className="flex-shrink-0 flex flex-col justify-center items-center h-24 p-2 mx-4 w-[168px]"
                  // Framer Motion animation properties for individual logo
                  variants={logoVariants}
                  animate={centeredLogoIndex === index ? "center" : "normal"} // Animate to center or normal scale
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
