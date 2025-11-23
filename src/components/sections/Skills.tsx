'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Brain, Rocket, ServerCog } from 'lucide-react';
import { skills } from '@/data/skills';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Skill } from '@/types';
import LogoLoop from '@/components/ui/reactbits/LogoLoop';
import CountUpText from '@/components/ui/text/CountUpText';

type Category = 'all' | 'frontend' | 'backend' | 'tools';
const EXPERT_STACK = new Set(['React', 'NestJS', 'Node.js', 'Flask', 'Django', 'MongoDB', 'PostgreSQL', 'MySQL']);

export default function Skills() {
  const t = useTranslations('skills');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: Category[] = ['all', 'frontend', 'backend', 'tools'];

  const highlightCards = [
    {
      icon: Brain,
      value: 18,
      suffix: '+',
      label: t('stats.ai.label'),
      description: t('stats.ai.description')
    },
    {
      icon: Rocket,
      value: 12,
      suffix: '+',
      label: t('stats.delivery.label'),
      description: t('stats.delivery.description')
    },
    {
      icon: ServerCog,
      value: 24,
      suffix: '+',
      label: t('stats.platforms.label'),
      description: t('stats.platforms.description')
    }
  ];
  
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
        >
          {highlightCards.map(({ icon: Icon, value, suffix, label, description }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="h-full rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-900/70 p-6 shadow-sm transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CountUpText value={value} suffix={suffix} className="text-3xl font-semibold text-slate-900 dark:text-white" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300 mt-2">
                    {label}
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/60 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <LogoLoop />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {filteredSkills.map(skill => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const t = useTranslations('skills');
  const isExpert = EXPERT_STACK.has(skill.name);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm"
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-500 dark:text-blue-300 mb-2">
            {t(`categories.${skill.category}`)}
          </p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
        </div>
        {isExpert && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-500 dark:text-blue-200">
            {t('expertBadge')}
          </span>
        )}
      </div>
      <p className="relative mt-4 text-sm text-slate-600 dark:text-slate-400">{t(`stories.${skill.category}`)}</p>
      <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
        {t('recentWorkLabel')}
      </p>
      <p className="text-sm text-slate-900 dark:text-slate-100 mt-1">
        {isExpert ? t('recentWorkExpert') : t('recentWorkContributor')}
      </p>
    </motion.div>
  );
}
