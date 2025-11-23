'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experiences } from '@/data/experience';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import type { Experience } from '@/types';

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const locale = useLocale() as 'en' | 'fr' | 'ar';

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

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Work Experience */}
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

          {/* Education */}
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
  locale: 'en' | 'fr' | 'ar';
  index: number;
  isLeft: boolean;
}) {
  const t = useTranslations('experience');
  
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {experience.title[locale]}
          </h4>
          <span className="text-sm text-slate-600 dark:text-slate-400 mt-1 sm:mt-0">
            {formatDate(experience.startDate, locale)} -{' '}
            {experience.endDate === 'present' ? t('present') : formatDate(experience.endDate, locale)}
          </span>
        </div>

        <div className="mb-2">
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {experience.company[locale]}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {experience.location[locale]}
          </p>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {experience.description[locale]}
        </p>
      </div>
    </motion.div>
  );
}
