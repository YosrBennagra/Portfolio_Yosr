"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import clsx from 'clsx';

export type TargetCursorProps = {
  color?: string;
  size?: number;
  className?: string;
};

export default function TargetCursor({ color = 'rgba(59,130,246,0.2)', size = 140, className }: TargetCursorProps) {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);
  const cursorRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 15, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15, mass: 0.15 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const rect = cursorRef.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(event.clientX - rect.left - size / 2);
      mouseY.set(event.clientY - rect.top - size / 2);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, size]);

  return (
    <motion.div
      ref={cursorRef}
      className={clsx('pointer-events-none absolute inset-0 z-0', className)}
      style={{ overflow: 'visible' }}
    >
      <motion.div
        className="target-cursor"
        style={{
          width: size,
          height: size,
          borderColor: color,
          x: springX,
          y: springY,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 80px ${color}`
        }}
      />
    </motion.div>
  );
}
