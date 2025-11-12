import React, { useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const DotMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    dotColor: new THREE.Color('#FFFFFF'),
    bgColor: new THREE.Color('#121212'),
    mouseTrail: null,
    rotation: 0,
    gridSize: 70,
    dotOpacity: 0.08,
  },
  /* glsl */ `
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 dotColor;
    uniform vec3 bgColor;
    uniform sampler2D mouseTrail;
    uniform float rotation;
    uniform float gridSize;
    uniform float dotOpacity;

    vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
    }

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 rotatedUv = rotate(uv, rotation);

      vec2 gridUv = fract(rotatedUv * gridSize);
      vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

      float baseDot = sdfCircle(gridUv, 0.25);

      float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
      vec2 centerDisplace = vec2(0.7, 1.1);
      float circleMaskCenter = length(uv - centerDisplace);
      float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);

      float combinedMask = screenMask * circleMaskFromCenter;
      float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

      float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
      float scaleInfluence = max(mouseInfluence * 0.5, circleAnimatedMask * 0.3);

      float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);

      float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));

      float smoothDot = smoothstep(0.05, 0.0, sdfDot);
      float opacityInfluence = max(mouseInfluence * 50.0, circleAnimatedMask * 0.5);

      vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

      gl_FragColor = vec4(composition, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
);

interface DotShaderProps {
  className?: string;
}

const Scene: React.FC = () => {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const { theme } = useTheme();
  const rotation = 0.1;
  const gridSize = 120;

  const themeColors = React.useMemo(() => {
    if (theme === 'light') {
      return {
        dotColor: '#fef3c7',
        bgColor: '#f5f3ff',
        dotOpacity: 0.12,
      };
    }
    return {
      dotColor: '#fde68a',
      bgColor: '#050505',
      dotOpacity: 0.05,
    };
  }, [theme]);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: 0.15,
    maxAge: 350,
    interpolate: 1,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      const x = event.clientX / width;
      const y = 1 - event.clientY / height;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        onMove({
          uv: new THREE.Vector2(x, y),
        } as any);
      }
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [onMove]);

  const dotMaterial = useMemo(() => new DotMaterial(), []);

  useEffect(() => {
    dotMaterial.uniforms.dotColor.value.set(themeColors.dotColor);
    dotMaterial.uniforms.bgColor.value.set(themeColors.bgColor);
    dotMaterial.uniforms.dotOpacity.value = themeColors.dotOpacity;
  }, [dotMaterial, themeColors]);

  useEffect(() => {
    dotMaterial.uniforms.resolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
  }, [dotMaterial, size, viewport.dpr]);

  useEffect(() => {
    dotMaterial.uniforms.mouseTrail.value = trail;
    dotMaterial.uniforms.rotation.value = rotation;
    dotMaterial.uniforms.gridSize.value = gridSize;
  }, [dotMaterial, gridSize, rotation, trail]);

  useFrame((state) => {
    dotMaterial.uniforms.time.value = state.clock.elapsedTime;
  });

  const scale = Math.max(viewport.width, viewport.height);

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} attach="material" />
    </mesh>
  );
};

export const DotScreenShader: React.FC<DotShaderProps> = ({ className }) => (
  <div className={cn('h-full w-full', className)}>
    <Canvas
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 1] }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default DotScreenShader;
