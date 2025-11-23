"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User2, Wrench, FolderKanban, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

type NavItem = {
  key: string;
  href: string;
  icon: React.ComponentType<any>;
  accent: string;
};

const navItems: NavItem[] = [
  { key: 'focus', href: '#focus', icon: Sparkles, accent: 'from-purple-500/20 to-purple-700/30' },
  { key: 'about', href: '#about', icon: User2, accent: 'from-blue-500/20 to-blue-700/30' },
  { key: 'skills', href: '#skills', icon: Wrench, accent: 'from-emerald-500/20 to-emerald-700/30' },
  { key: 'projects', href: '#projects', icon: FolderKanban, accent: 'from-indigo-500/20 to-indigo-700/30' },
  { key: 'experience', href: '#experience', icon: Briefcase, accent: 'from-orange-500/25 to-orange-600/40' },
  { key: 'contact', href: '#contact', icon: Mail, accent: 'from-pink-500/25 to-pink-600/40' },
];

export default function CardNav() {
  const t = useTranslations('cardnav');

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.currentTarget.click();
    }
  }, []);

  return (
    <section className="py-12" aria-labelledby="cardnav-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
        >
          <h2 id="cardnav-title" className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('title')}
          </h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  href={item.href}
                  aria-label={t(`items.${item.key}`)}
                  onKeyDown={handleKey}
                  className={`group relative flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br ${item.accent} p-4 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition`}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/70 dark:bg-slate-800/70 shadow-sm">
                      <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    </span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {t(`items.${item.key}`)}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition" />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/10 dark:bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/10 dark:bg-black/20 rounded-full blur-3xl" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
