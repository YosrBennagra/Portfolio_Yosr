'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/reactbits/SpotlightCard';

export default function About() {
  const t = useTranslations('about');
  const d = useTranslations('degree');
  const [open, setOpen] = useState(false);
  const compactRegionKeys = ['eu', 'fr', 'us', 'gulf'] as const;
  const detailRegionKeys = ['eu', 'fr', 'ca', 'de', 'it', 'es', 'uk', 'us', 'gulf'] as const;

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
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

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/images/YosrBenNagra_Picture_2.jpg"
                alt="Yosr Ben Nagra alternate"
                fill
                priority
                className="object-cover rounded-2xl"
                style={{ objectPosition: '30% 50%' }}
              />
              {/* Secondary image thumbnail */}
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-xl overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-lg">
                <Image
                  src="/images/YosrBenNagra_Picture.jpg"
                  alt="Yosr Ben Nagra portrait"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '60% 10%' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('bio')}
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I recently completed my Engineering degree at ESPRIT in Tunisia. I focus on building scalable
                full-stack applications with AI features and DevOps practices, using React, Angular, Spring Boot,
                NestJS, and steady delivery pipelines.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I enjoy solving tough problems with clean, maintainable code while staying close to new tools.
                Let’s build something reliable together.
              </p>
            </div>

            {/* Degree equivalence highlight */}
            <div className="mt-10 space-y-4">
              <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 dark:text-blue-300">
                <GraduationCap className="h-5 w-5" />
                <span>{d('title')}</span>
              </div>
              <SpotlightCard
                title={d('headline')}
                description={d('summary')}
                accent="from-blue-700/90 via-indigo-700/85 to-purple-700/80"
                className="text-left border-white/30"
              >
                <div className="flex flex-wrap gap-2 pt-2">
                  {compactRegionKeys.map((region) => (
                    <span
                      key={region}
                      className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
                    >
                      {d(`regionsShort.${region}`)}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setOpen((o) => !o)}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
                >
                  {open ? d('toggleLess') : d('toggleMore')}
                </button>
                {open && (
                  <div className="mt-6 space-y-3 text-sm text-white/85">
                    <p className="text-base font-semibold text-white">{d('detailsTitle')}</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {detailRegionKeys.map((region) => (
                        <li
                          key={region}
                          className="rounded-2xl bg-white/10 px-3 py-2 text-xs sm:text-sm leading-snug"
                        >
                          {d(`regions.${region}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </SpotlightCard>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                {t('downloadResume')}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="w-5 h-5" />
                {t('viewResume')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
