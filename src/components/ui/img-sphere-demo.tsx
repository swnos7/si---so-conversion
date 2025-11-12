import React from 'react';
import SphereImageGrid, { ImageData } from '@/components/ui/img-sphere';

const BASE_IMAGES: Omit<ImageData, 'id'>[] = [
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=987&q=80',
    alt: 'Mountain sunrise',
    title: 'Mountain Landscape',
    description: 'Golden sunrise over rugged alpine mountains.',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=987&q=80',
    alt: 'Portrait',
    title: 'Portrait Photography',
    description: 'Natural light portrait with warm tones.',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=987&q=80',
    alt: 'Workspace',
    title: 'Urban Architecture',
    description: 'Minimal studio blending glass and timber.',
  },
  {
    src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=987&q=80',
    alt: 'Forest',
    title: 'Nature Scene',
    description: 'Evergreen forest with morning fog.',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=987&q=80',
    alt: 'Abstract Art',
    title: 'Abstract Art',
    description: 'Bold colors blending in abstract forms.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=987&q=80',
    alt: 'Coastline',
    title: 'Coastal Escape',
    description: 'Rocky coastline bathed in soft blue light.',
  },
  {
    src: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=987&q=80',
    alt: 'Modern interior',
    title: 'Interiors',
    description: 'Scandinavian living room inspiration.',
  },
  {
    src: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=987&q=80',
    alt: 'City skyline',
    title: 'City Vibes',
    description: 'Hazy skyline showing downtown silhouettes.',
  },
  {
    src: 'https://images.unsplash.com/photo-1487014679447-9b9d0d1dda99?auto=format&fit=crop&w=987&q=80',
    alt: 'Workspace desk',
    title: 'Creative Studio',
    description: 'Design studio desk with warm lighting.',
  },
  {
    src: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=987&q=80',
    alt: 'Desert road',
    title: 'Desert Journey',
    description: 'Open road through the desert at sunset.',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=987&q=80',
    alt: 'Waterfall',
    title: 'Waterfall Escape',
    description: 'Tropical waterfall hidden in the jungle.',
  },
  {
    src: 'https://images.unsplash.com/photo-1523419409543-0c1df022bddb?auto=format&fit=crop&w=987&q=80',
    alt: 'Minimal interior',
    title: 'Minimal Loft',
    description: 'Neutral palette loft with layered textures.',
  },
];

const IMAGES: ImageData[] = [];
for (let i = 0; i < 60; i += 1) {
  const baseIndex = i % BASE_IMAGES.length;
  const baseImage = BASE_IMAGES[baseIndex];
  IMAGES.push({
    id: `img-${i + 1}`,
    ...baseImage,
    alt: `${baseImage.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
  });
}

const CONFIG = {
  containerSize: 600,
  sphereRadius: 220,
  dragSensitivity: 0.8,
  momentumDecay: 0.96,
  maxRotationSpeed: 6,
  baseImageScale: 0.15,
  hoverScale: 1.3,
  perspective: 1000,
  autoRotate: true,
  autoRotateSpeed: 0.2,
};

const SphereDemo = () => (
  <main className="flex min-h-screen w-full items-center justify-center p-6">
    <SphereImageGrid images={IMAGES} {...CONFIG} />
  </main>
);

export default SphereDemo;
