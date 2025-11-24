"use client";

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
import { experiences } from '@/data/experience';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import type { Experience } from '@/types';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const locale = useLocale() as 'en' | 'fr';
  const [viewMode, setViewMode] = useState<'detailed' | 'summary'>('detailed');

  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const education = experiences.filter(exp => exp.type === 'education');

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800">
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

        <div className="flex flex-col items-center gap-4 mb-14">
          <p className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-[0.25em]">
            {t('viewToggle.label')}
          </p>
          <div className="inline-flex rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-1 shadow-sm">
            {(['detailed', 'summary'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={clsx(
                  'px-5 py-2 text-sm font-semibold rounded-full transition-all',
                  viewMode === mode
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow'
                    : 'text-slate-600 dark:text-slate-300'
                )}
              >
                {t(`viewToggle.${mode}`)}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'detailed' ? (
          <div className="max-w-4xl mx-auto space-y-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-600" />
                {t('work')}
              </h3>
              <div className="space-y-8">
                {workExperiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    locale={locale}
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                {t('education')}
              </h3>
              <div className="space-y-8">
                {education.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    locale={locale}
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <SummaryExperienceView experiences={experiences} locale={locale} />
        )}
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  locale,
  index,
  isLeft
}: {
  experience: Experience;
  locale: 'en' | 'fr';
  index: number;
  isLeft: boolean;
}) {
  const t = useTranslations('experience');
  const logoWrapperClasses = experience.logoClassName ?? 'h-10 w-28 sm:w-32';
  const logoContainerClass = clsx(
    'relative flex items-center justify-center rounded-xl border border-slate-200/80 bg-white p-2 dark:border-white/10 dark:bg-white/5',
    logoWrapperClasses
  );
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={isLeft ? fadeInLeft : fadeInRight}
      className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-slate-800" />

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {experience.title[locale]}
            </h4>
            {experience.isInternship && (
              <Badge variant="secondary" className="uppercase tracking-wide text-xs">
                {t('internship')}
              </Badge>
            )}
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400 mt-1 sm:mt-0">
            {formatDate(experience.startDate, locale)} -{' '}
            {experience.endDate === 'present' ? t('present') : formatDate(experience.endDate, locale)}
          </span>
        </div>

        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {experience.logo && (
            <div className={logoContainerClass}>
              <Image
                src={experience.logo}
                alt={`${experience.company[locale]} logo`}
                fill
                sizes="160px"
                className="object-contain drop-shadow"
              />
            </div>
          )}
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {experience.company[locale]}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {experience.location[locale]}
            </p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {experience.description[locale]}
        </p>
        {experience.type !== 'education' &&
          experience.highlights &&
          experience.highlights[locale].length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5">
            {experience.highlights[locale].map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function SummaryExperienceView({
  experiences,
  locale
}: {
  experiences: Experience[];
  locale: 'en' | 'fr';
}) {
  const t = useTranslations('experience');

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid gap-6 md:grid-cols-2"
    >
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          variants={fadeInUp}
          custom={index}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{exp.title[locale]}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{exp.company[locale]}</p>
            </div>
            <Badge variant="secondary" className="uppercase tracking-wide text-[11px]">
              {exp.type === 'education' ? t('education') : t('work')}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {formatDate(exp.startDate, locale)} - {exp.endDate === 'present' ? t('present') : formatDate(exp.endDate, locale)}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {truncateText(exp.description[locale])}
          </p>
          {exp.highlights && exp.highlights[locale].length > 0 && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {exp.highlights[locale][0]}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function truncateText(text: string, limit = 180) {
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit - 3)}...`;
}
