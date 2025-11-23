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
  'Azure DevOps',
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
    <div className={clsx('logo-loop relative overflow-hidden rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur', className)}>
      <motion.div
        className="logo-loop-track flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
