import React from 'react';
import DotScreenShader from '@/components/ui/dot-shader-background';

const DotShaderDemo = () => (
  <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
    <DotScreenShader className="absolute inset-0 opacity-90" />
    <div className="relative z-10 text-center text-white">
      <h1 className="text-4xl font-light tracking-tight md:text-6xl">Digital Innovation</h1>
      <p className="mt-4 text-base text-white/70 md:text-xl">
        Where ideas shimmer through a field of precision engineered light.
      </p>
    </div>
  </div>
);

export default DotShaderDemo;
