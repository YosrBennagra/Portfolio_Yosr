"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Cpu, Layers, ServerCog, Workflow, Globe2, Users } from 'lucide-react';
import LightRays from '@/components/ui/reactbits/LightRays';

const focusItems = [
  {
    key: 'ai',
    icon: Cpu,
    span: 'md:col-span-2',
    border: 'border-purple-200/60 dark:border-purple-500/30',
    accent: 'from-purple-600/15 via-purple-600/5 to-transparent',
    iconBg: 'bg-purple-600/15 text-purple-600'
  },
  {
    key: 'fullstack',
    icon: Layers,
    span: 'md:col-span-1',
    border: 'border-blue-200/60 dark:border-blue-500/30',
    accent: 'from-blue-600/15 via-blue-600/5 to-transparent',
    iconBg: 'bg-blue-600/15 text-blue-600'
  },
  {
    key: 'devops',
    icon: ServerCog,
    span: 'md:col-span-1',
    border: 'border-emerald-200/60 dark:border-emerald-500/30',
    accent: 'from-emerald-600/15 via-emerald-600/5 to-transparent',
    iconBg: 'bg-emerald-600/15 text-emerald-600'
  },
  {
    key: 'quality',
    icon: Workflow,
    span: 'md:col-span-2',
    border: 'border-indigo-200/60 dark:border-indigo-500/30',
    accent: 'from-indigo-600/15 via-indigo-600/5 to-transparent',
    iconBg: 'bg-indigo-600/15 text-indigo-600'
  },
  {
    key: 'intl',
    icon: Globe2,
    span: 'md:col-span-1',
    border: 'border-orange-200/60 dark:border-orange-500/30',
    accent: 'from-orange-500/20 via-orange-500/5 to-transparent',
    iconBg: 'bg-orange-500/15 text-orange-600'
  },
  {
    key: 'collab',
    icon: Users,
    span: 'md:col-span-1',
    border: 'border-pink-200/60 dark:border-pink-500/30',
    accent: 'from-pink-500/20 via-pink-500/5 to-transparent',
    iconBg: 'bg-pink-500/15 text-pink-600'
  }
];

export default function MagicBento() {
  const t = useTranslations('bento');

  return (
    <section className="relative py-20" id="focus">
      <LightRays className="opacity-30" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            {t('title')}
          </p>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 auto-rows-[minmax(200px,1fr)]">
          {focusItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ translateY: -6 }}
                className={clsx(
                  'relative rounded-3xl border bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-black/40',
                  item.border,
                  item.span
                )}
              >
                <div className={clsx('absolute inset-0 rounded-3xl opacity-80 bg-gradient-to-br', item.accent)} />
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={clsx('inline-flex h-11 w-11 items-center justify-center rounded-2xl', item.iconBg)}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-base font-semibold text-slate-900 dark:text-white">
                        {t(`items.${item.key}`)}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 dark:bg-white/10 dark:text-white/80">
                      {t(`metrics.${item.key}`)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 flex-1">
                    {t(`descriptions.${item.key}`)}
                  </p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/20" />
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {t('pulseLabel')}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
