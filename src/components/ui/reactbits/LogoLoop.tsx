"use client";

import clsx from 'clsx';
import { motion } from 'framer-motion';

export type LogoLoopProps = {
  items?: string[];
  className?: string;
  speed?: number;
};

const DEFAULT_ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'NestJS',
  'Django',
  'Spring Boot',
  'PostgreSQL',
  'MongoDB',
  'Neo4j',
  'SQL / NoSQL',
  'Docker',
  'Big Data',
  'AI Fine-Tuning',
  'CRISP-DM',
  'Agile Delivery',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP'
];

export default function LogoLoop({ items = DEFAULT_ITEMS, className, speed = 28 }: LogoLoopProps) {
  const content = [...items, ...items];

  return (
    <div className={clsx('logo-loop relative overflow-hidden rounded-full border border-orange-200/50 dark:border-slate-800 bg-gradient-to-r from-orange-50/60 via-white/60 to-rose-50/60 dark:from-slate-900/60 dark:via-slate-900/60 dark:to-slate-900/60 backdrop-blur', className)}>
      <motion.div
        className="logo-loop-track flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-default">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
