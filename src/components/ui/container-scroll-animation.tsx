import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({ titleComponent, children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleRange: [number, number] = isMobile ? [0.98, 1] : [1, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className={cn('relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20', className)}
    >
      <div className="relative w-full py-10 md:py-32" style={{ perspective: '1000px' }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header: React.FC<{ translate: MotionValue<number>; children: React.ReactNode }> = ({ translate, children }) => (
  <motion.div style={{ translateY: translate }} className="mx-auto max-w-4xl text-center">
    {children}
  </motion.div>
);

const Card: React.FC<{
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}> = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
    }}
    className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[32px] border-4 border-white/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-3 md:h-[40rem] md:p-6"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60">
      {children}
    </div>
  </motion.div>
);

export default ContainerScroll;
