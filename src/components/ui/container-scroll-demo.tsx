import React from 'react';
import ContainerScroll from '@/components/ui/container-scroll-animation';

const ScrollAnimationDemo = () => (
  <div className="flex flex-col overflow-hidden pb-[400px] pt-[300px]">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-semibold text-white">
            Unleash the power of <br />
            <span className="text-4xl md:text-[5rem] font-bold leading-none text-yellow-400">
              Scroll Animations
            </span>
          </h1>
        </>
      }
    >
      <img
        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80"
        alt="Showcase"
        className="h-full w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </ContainerScroll>
  </div>
);

export default ScrollAnimationDemo;
