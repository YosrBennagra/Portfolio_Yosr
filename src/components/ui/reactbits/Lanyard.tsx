"use client";

import { motion } from 'framer-motion';
import clsx from 'clsx';

export type LanyardProps = {
  status: string;
  detail: string;
  timezone: string;
  className?: string;
};

export default function Lanyard({ status, detail, timezone, className }: LanyardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx('lanyard relative flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 shadow-xl', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Status</span>
        <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {timezone}
        </span>
      </div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-white">{status}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </motion.div>
  );
}
