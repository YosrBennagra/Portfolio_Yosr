"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Cpu, Layers, ServerCog, Workflow, Globe2, Users } from 'lucide-react';
import LightRays from '@/components/ui/reactbits/LightRays';

const items = [
  { key: 'ai', icon: Cpu, col: 'md:col-span-2', row: 'row-span-1', accent: 'from-purple-500/20 to-purple-700/30' },
  { key: 'fullstack', icon: Layers, col: 'md:col-span-1', row: 'row-span-1', accent: 'from-blue-500/20 to-blue-700/30' },
  { key: 'devops', icon: ServerCog, col: 'md:col-span-1', row: 'row-span-1', accent: 'from-emerald-500/20 to-emerald-700/30' },
  { key: 'quality', icon: Workflow, col: 'md:col-span-2', row: 'row-span-1', accent: 'from-indigo-500/20 to-indigo-700/30' },
  { key: 'intl', icon: Globe2, col: 'md:col-span-1', row: 'row-span-1', accent: 'from-orange-500/25 to-orange-600/40' },
  { key: 'collab', icon: Users, col: 'md:col-span-1', row: 'row-span-1', accent: 'from-pink-500/25 to-pink-600/40' },
];

export default function MagicBento() {
  const t = useTranslations('bento');

  return (
    <section className="py-20 relative" id="focus">
      <LightRays className="opacity-30" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[180px]">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/5 bg-gradient-to-br ${item.accent} backdrop-blur-lg p-4 flex flex-col justify-between ${item.col} ${item.row}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/70 dark:bg-slate-800/70 shadow-sm">
                    <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t(`items.${item.key}`)}
                  </h3>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 dark:bg-black/20 rounded-full blur-3xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
