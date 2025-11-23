"use client";

import { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export type DockItem = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

export type DockProps = {
  items: DockItem[];
  className?: string;
};

export default function Dock({ items, className }: DockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={clsx('dock inline-flex items-end gap-3 rounded-3xl border border-white/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl px-4 py-3 shadow-[0_20px_80px_rgba(15,23,42,0.2)]', className)}
    >
      {items.map(item => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className="dock-item group relative flex flex-col items-center gap-2 rounded-2xl px-3 pt-3 pb-2 text-slate-600 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-white/10 transition"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 group-hover:text-blue-500">{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
