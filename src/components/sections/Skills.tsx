'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Monitor, Server, Wrench } from 'lucide-react';
import { skills } from '@/data/skills';
import { fadeInUp } from '@/lib/animations';
import type { Skill } from '@/types';
import LogoLoop from '@/components/ui/reactbits/LogoLoop';

type Category = 'frontend' | 'backend' | 'tools';

const SECTION_ORDER: Category[] = ['frontend', 'backend', 'tools'];

const SECTION_META: Record<Category, { accent: string; icon: React.ElementType }> = {
  frontend: {
    accent: 'bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-500',
    icon: Monitor
  },
  backend: {
    accent: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-400',
    icon: Server
  },
  tools: {
    accent: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
    icon: Wrench
  }
};

const EXPERT_SKILLS = new Set([
  'React',
  'TypeScript',
  'Next.js',
  'Spring Boot',
  'NestJS',
  'Node.js',
  'Express',
  'RESTful APIs',
  'Python/Flask',
  'MongoDB',
  'MySQL',
  'NoSQL',
  'PostgreSQL',
  'Jenkins',
  'SonarQube',
  'Grafana',
  'Prometheus',
  'Unit Testing',
  'GitHub Actions',
  'CI/CD Pipelines',
  'Docker',
  'AI Fine-Tuning'
]);

export default function Skills() {
  const t = useTranslations('skills');
  const sections = SECTION_ORDER.map((category) => ({
    category,
    title: t(`categories.${category}`),
    meta: SECTION_META[category],
    summary: t(`summaries.${category}`),
    items: skills
      .filter((skill) => skill.category === category)
      .sort((a, b) => b.level - a.level)
  }));

  return (
    <section id="skills" className="py-10 md:py-12 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Compact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
        >
          <div>
            <motion.h2
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xs text-slate-600 dark:text-slate-400"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </motion.div>

        {/* Logo Loop - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-6"
        >
          <LogoLoop />
        </motion.div>

        {/* Skills - Horizontal 3-column layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-3"
        >
          {sections.map((section, index) => {
            const Icon = section.meta.icon;
            return (
              <motion.div
                key={section.category}
                variants={fadeInUp}
                custom={index}
                className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 p-3 shadow-sm"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className={clsx('flex h-7 w-7 items-center justify-center rounded-lg text-white', section.meta.accent)}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {section.title}
                    </p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400">
                      {section.items.length} skills
                    </p>
                  </div>
                </div>
                {/* Skills as compact pills */}
                <div className="flex flex-wrap gap-1">
                  {section.items.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillPill({ skill }: { skill: Skill }) {
  const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-all hover:scale-105',
        isExpert
          ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
      )}
    >
      {skill.name}
      {isExpert && (
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
      )}
    </span>
  );
}
