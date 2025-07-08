// src/components/sections/Suppliers.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { suppliersLogos } from '@/data/content'; // Assuming this import provides your logos

const Suppliers = () => {
  const suppliers = suppliersLogos || [];
  const scrollerRef = useRef(null);
  const logoRefs = useRef([]); // Ref for individual logo divs

  // --- Configuration ---
  const logoItemWidth = 200; // Total effective width of each logo container (e.g., 168px content + 32px margin)
  const scrollSpeed = 50; // Pixels per second (higher = faster)
  const rotationDegrees = 90; // Degrees for entry/exit rotation
  const centerZoomScale = 1.2; // Scale factor for the center logo

  // Duplicate suppliers exactly once: [Set1, Set2].
  // This is crucial for the seamless "teleport" effect.
  const duplicatedSuppliers = [...suppliers, ...suppliers];

  // Framer Motion motion value for the horizontal scroll position of the entire strip.
  // This value will be directly manipulated for seamless looping.
  const x = useMotionValue(0);
  // useSpring provides a smooth, physics-based animation for the 'x' transform.
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  // State to store the index of the currently "centered" logo for the zoom effect.
  const [centeredLogoIndex, setCenteredLogoIndex] = useState(null);

  // Framer Motion variants for individual logo center zoom.
  // Rotation and opacity are handled dynamically by useTransform for entry/exit.
  const logoVariants = {
    // Center state: logo is scaled up when it's in the visual center.
    center: {
      scale: centerZoomScale,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    // Normal state: logo is at its default scale when not centered.
    normal: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // --- Core Seamless Scroll Animation Loop ---
  const startScrolling = useCallback(() => {
    let animationFrameId; // To store the ID from requestAnimationFrame
    let currentX = x.get(); // Initialize with the current x value
    let lastTime = performance.now(); // Timestamp of the last animation frame

    // The width of one complete set of original suppliers.
    // This is the distance after which we "teleport" the content.
    const oneSetWidth = suppliers.length * logoItemWidth;

    const animateScroll = (timestamp) => {
      if (!scrollerRef.current) return; // Stop if the scroller element is no longer in the DOM

      const deltaTime = timestamp - lastTime; // Time elapsed since last frame
      lastTime = timestamp;

      currentX -= (scrollSpeed / 1000) * deltaTime; // Move left

      // Seamless loop logic:
      // If the entire first set of logos has scrolled off-screen to the left,
      // instantaneously reset 'x' back to 0.
      // At this point, the second set of logos is exactly where the first set was,
      // making the transition visually undetectable.
      if (currentX <= -oneSetWidth) {
        currentX = 0; // Reset to 0 for a seamless jump
        x.set(currentX); // Directly set the MotionValue to 0
      } else {
        x.set(currentX); // Update the Framer Motion value, which 'springX' then animates smoothly
      }

      // Determine the centered logo for the zoom effect.
      const containerRect = scrollerRef.current.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2; // Center of the visible scroll area

      let newCenteredIndex = null;
      // Iterate through all rendered logo elements (including duplicated ones)
      logoRefs.current.forEach((logoEl, idx) => {
        if (!logoEl) return; // Skip if ref is null (e.g., during component unmount)
        const logoRect = logoEl.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2; // Center of the current logo element

        // Check if the logo's center is approximately within the center zone of the container.
        // This tolerance defines the "hotspot" for the center zoom.
        if (Math.abs(logoCenterX - containerCenterX) < logoItemWidth / 2) {
          newCenteredIndex = idx; // Store the index of the centered logo
        }
      });

      // Update the centeredLogoIndex state only if it has changed, to prevent unnecessary re-renders.
      if (newCenteredIndex !== centeredLogoIndex) {
        setCenteredLogoIndex(newCenteredIndex);
      }

      // Request the next animation frame to continue the loop.
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Start the animation loop.
    animationFrameId = requestAnimationFrame(animateScroll);

    // Cleanup function: This runs when the component unmounts or when dependencies change.
    // It ensures that the animation frame is cancelled to prevent memory leaks.
    return () => cancelAnimationFrame(animationFrameId);
  }, [suppliers.length, x, scrollSpeed, logoItemWidth, centeredLogoIndex]); // Dependencies for useCallback

  // Effect hook to initiate the scrolling animation when the suppliers data is available.
  useEffect(() => {
    if (suppliers.length > 0) {
      // Initialize 'x' to 0. The animation will start from here.
      x.set(0);
      // Call the memoized startScrolling function and store its cleanup function.
      const cleanupScroll = startScrolling();
      return () => cleanupScroll(); // Return the cleanup function for useEffect
    }
  }, [suppliers.length, startScrolling, x]); // Dependencies for useEffect

  // --- Render ---
  // Display a message if no supplier logos are available.
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
          {/* Inline style for the fade effects at the left and right edges of the scroller */}
          <style jsx>{`
            .fade-left {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 15%; /* Width of the fade area */
              /* Gradient from opaque black to transparent black, creating a fade effect */
              background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0) 100%);
              z-index: 10; /* Ensure it's above the logos */
              pointer-events: none; /* Allows mouse events to pass through to elements beneath */
            }
            .fade-right {
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 15%;
              /* Gradient from opaque black to transparent black, but from right to left */
              background: linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0) 100%);
              z-index: 10;
              pointer-events: none;
            }
          `}</style>

          <motion.div
            ref={scrollerRef}
            className="flex transform-gpu" // 'transform-gpu' hints to the browser to use GPU acceleration for transforms
            style={{ x: springX }} // Bind the smooth spring motion value to the 'x' transform property
          >
            {/* Map over the duplicated suppliers array to render the continuous scrollable content */}
            {duplicatedSuppliers.map((supplier, index) => {
              const isBeesley = supplier.alt === 'Beesley';
              const isJewson = supplier.alt === 'Jewson';

              let imgStyle = {
                objectFit: 'contain', // Ensures the image scales down to fit without cropping
                width: '120px',   // Desired visual width for the image itself
                height: '80px',  // Desired visual height for the image itself
              };

              // Conditional scaling for specific logos to adjust their visual size
              // within the fixed image bounds, if they appear too large or too small.
              if (isBeesley) {
                imgStyle.transform = 'scale(0.7)'; // Example: Reduce Beesley to 70% of 120x80
              } else if (isJewson) {
                imgStyle.transform = 'scale(0.9)'; // Example: Reduce Jewson to 90% of 120x80
              }

              // Calculate the absolute x-position of this specific item on the conceptual infinite track.
              const itemAbsoluteX = index * logoItemWidth;

              // Create a MotionValue that represents the visual X-coordinate of the logo's left edge
              // relative to the viewport. This value will decrease as the logo scrolls left.
              // It's derived from the main 'x' motion value (the container's position).
              const logoLeftEdgeRelative = useTransform(x, (latestX) => {
                return itemAbsoluteX + latestX;
              });

              // Use useTransform to map the 'logoLeftEdgeRelative' (which is decreasing)
              // to the desired opacity values.
              const opacity = useTransform(
                logoLeftEdgeRelative,
                [
                  window.innerWidth,           // Logo's left edge is at viewport's right edge (just off-screen right)
                  window.innerWidth - logoItemWidth, // Logo's left edge is fully inside viewport from right
                  0,                           // Logo's left edge is at viewport's left edge (start exiting)
                  -logoItemWidth               // Logo is fully off-screen left
                ],
                [0, 1, 1, 0] // Output: Fade in -> Full opacity -> Fade out
              );

              // Use useTransform to map 'logoLeftEdgeRelative' to the desired rotation values.
              const rotateZ = useTransform(
                logoLeftEdgeRelative,
                [
                  window.innerWidth,
                  window.innerWidth - logoItemWidth,
                  0,
                  -logoItemWidth
                ],
                [rotationDegrees, 0, 0, -rotationDegrees] // Output: Rotate clockwise on entry -> No rotation -> Rotate counter-clockwise on exit
              );

              return (
                <motion.div
                  key={`${supplier.src}-${index}`} // Unique key for each duplicated item for React's reconciliation
                  ref={(el) => (logoRefs.current[index] = el)} // Store ref for precise DOM measurement
                  // flex-shrink-0 prevents items from shrinking. h-24 sets height. p-2 adds padding. mx-4 adds margin.
                  // The explicit 'width' style ensures each motion.div takes up a consistent space.
                  className="flex-shrink-0 flex flex-col justify-center items-center h-24 p-2 mx-4"
                  // Apply dynamic opacity and rotation directly to the style prop.
                  style={{ width: `${logoItemWidth - 32}px`, opacity, rotateZ }}
                  // Framer Motion variants for individual logo: zoom when centered.
                  // 'animate' prop applies the 'center' variant if the logo is currently centered, otherwise 'normal'.
                  variants={logoVariants}
                  animate={centeredLogoIndex === index ? "center" : "normal"}
                >
                  <img
                    src={supplier.src}
                    alt={supplier.alt}
                    style={imgStyle} // Apply the computed image styling
                    // Fallback for image loading errors: replaces the broken image with a placeholder.
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x80/000/FFF?text=Error`; }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Overlay divs for the aesthetic fade effect at the edges */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>

        {/* Call to action for potential partners */}
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
