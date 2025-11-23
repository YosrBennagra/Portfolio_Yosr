"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import clsx from 'clsx';

export type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export default function TiltedCard({ children, className, intensity = 12 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateAmountY = ((x - midX) / midX) * intensity;
    const rotateAmountX = -((y - midY) / midY) * intensity;
    rotateX.set(rotateAmountX);
    rotateY.set(rotateAmountY);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={clsx('tilted-card relative transition-shadow duration-300', className)}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 dark:border-white/5 shadow-[0_20px_60px_rgba(15,23,42,0.2)]" />
    </motion.div>
  );
}
