"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';

export type ScrollStackItem = {
  title: string;
  subtitle: string;
  description: string;
  accent?: string;
};

export type ScrollStackProps = {
  items: ScrollStackItem[];
  className?: string;
};

export default function ScrollStack({ items, className }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <div ref={containerRef} className={clsx('relative min-h-[320px]', className)}>
      {items.map((item, index) => {
        const translateY = useTransform(scrollYProgress, [0, 1], [index * 24, index * -12]);
        const opacity = useTransform(scrollYProgress, [0, 0.3 + index * 0.1], [0.3, 1]);
        return (
          <motion.div
            key={item.title}
            style={{ translateY, opacity }}
            className={clsx(
              'scroll-stack-card absolute left-0 right-0 mx-auto max-w-3xl rounded-2xl border backdrop-blur-xl p-6 shadow-2xl bg-gradient-to-br',
              item.accent ?? 'from-white/80 to-slate-100/70 dark:from-slate-900/80 dark:to-slate-900/40'
            )}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2">{item.subtitle}</p>
            <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
