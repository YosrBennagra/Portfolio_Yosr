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
          className="max-w-4xl mx-auto mb-12"
        >
          <LogoLoop />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {sections.map((section, index) => {
            const Icon = section.meta.icon;
            return (
              <motion.div
                key={section.category}
                variants={fadeInUp}
                custom={index}
                className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                      {section.title}
                    </p>
                    <p className="text-base font-medium text-slate-900 dark:text-white">
                      {section.summary}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {section.items.length} skills tracked
                    </p>
                  </div>
                  <div className={clsx('flex h-12 w-12 items-center justify-center rounded-2xl text-white', section.meta.accent)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.items.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} />
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

function SkillRow({ skill }: { skill: Skill }) {
  const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all',
        isExpert
          ? 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-100'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-200'
      )}
    >
      <span>{skill.name}</span>
      {isExpert && (
        <span className="text-[11px] uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">Expert</span>
      )}
    </div>
  );
}
