"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
import { experiences } from '@/data/experience';
import { fadeInUp } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import type { Experience } from '@/types';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const locale = useLocale() as 'en' | 'fr';

  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const education = experiences.filter(exp => exp.type === 'education');

  return (
    <section id="experience" className="py-10 md:py-12 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Two Column Layout - Work & Education Side by Side */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Work Experience Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t('work')}
              </h3>
            </div>
            <div className="space-y-2">
              {workExperiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  locale={locale}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t('education')}
              </h3>
            </div>
            <div className="space-y-2">
              {education.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  locale={locale}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  locale,
  index,
}: {
  experience: Experience;
  locale: 'en' | 'fr';
  index: number;
}) {
  const t = useTranslations('experience');
  const logoWrapperClasses = experience.logoClassName ?? 'h-6 w-20';
  const logoContainerClass = clsx(
    'relative flex items-center justify-center rounded-md border border-slate-200/80 bg-white p-1 dark:border-white/10 dark:bg-white/5',
    logoWrapperClasses
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      custom={index}
      className="group relative rounded-lg border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-900/80 p-3 hover:shadow-md transition-all"
    >
      {/* Header Row */}
      <div className="flex items-start gap-2 mb-2">
        {experience.logo && (
          <div className={logoContainerClass}>
            <Image
              src={experience.logo}
              alt={`${experience.company[locale]} logo`}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {experience.title[locale]}
            </h4>
            {experience.isInternship && (
              <Badge variant="secondary" className="uppercase tracking-wide text-[8px] px-1 py-0">
                {t('internship')}
              </Badge>
            )}
          </div>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
            {experience.company[locale]}
          </p>
        </div>
        <span className="text-[9px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
          {formatDate(experience.startDate, locale)} - {experience.endDate === 'present' ? t('present') : formatDate(experience.endDate, locale)}
        </span>
      </div>

      {/* Description - Truncated */}
      <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
        {experience.description[locale]}
      </p>

      {/* Highlights Preview */}
      {experience.type !== 'education' &&
        experience.highlights &&
        experience.highlights[locale].length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {experience.highlights[locale].slice(0, 2).map((point) => (
              <span key={point} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[8px] text-slate-600 dark:text-slate-400">
                {point.length > 50 ? point.slice(0, 47) + '...' : point}
              </span>
            ))}
          </div>
        )}
    </motion.div>
  );
}
