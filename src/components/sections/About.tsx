'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap, Sparkles, Layers, Cpu, ServerCog } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/reactbits/SpotlightCard';
import LinkButton from '@/components/ui/LinkButton';

const resumeFiles = [
  {
    key: 'english',
    file: '/CV_Yosr_BenNagra_English_General.pdf',
    downloadName: 'Yosr_BenNagra_CV_EN.pdf',
    accent: 'from-blue-500/15 via-blue-500/5 to-transparent'
  },
  {
    key: 'french',
    file: '/CV_Yosr_BenNagra_French_General.pdf',
    downloadName: 'Yosr_BenNagra_CV_FR.pdf',
    accent: 'from-rose-500/15 via-rose-500/5 to-transparent'
  }
] as const;

const factKeys = ['location', 'availability', 'languages'] as const;

type HighlightCardConfig = {
  key: 'experience' | 'stack' | 'ai' | 'delivery';
  icon: LucideIcon;
  accent: string;
};

const highlightCardsConfig: HighlightCardConfig[] = [
  { key: 'experience', icon: Sparkles, accent: 'from-blue-500/20 via-blue-500/5 to-transparent' },
  { key: 'stack', icon: Layers, accent: 'from-purple-500/20 via-purple-500/5 to-transparent' },
  { key: 'ai', icon: Cpu, accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent' },
  { key: 'delivery', icon: ServerCog, accent: 'from-orange-500/20 via-orange-500/5 to-transparent' }
];

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

        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md lg:max-w-full mx-auto">
                <Image
                  src="/images/YosrBenNagra_Picture_2.jpg"
                  alt="Yosr Ben Nagra alternate"
                  fill
                  priority
                  className="object-cover rounded-[32px]"
                  style={{ objectPosition: '30% 50%' }}
                />
                <div className="absolute bottom-6 right-6 hidden w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-white shadow-xl sm:block">
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
              className="space-y-8"
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

              <div className="grid gap-4 sm:grid-cols-2">
                {highlightCardsConfig.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.key}
                      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg dark:border-white/10 dark:bg-slate-900"
                    >
                      <div className={clsx('absolute inset-0 opacity-80 bg-gradient-to-br', card.accent)} />
                      <div className="relative space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                          <Icon className="h-4 w-4" />
                          <span>{t(`highlights.${card.key}.label`)}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {t(`highlights.${card.key}.value`)}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {t(`highlights.${card.key}.detail`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-slate-900/80">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">{t('facts.title')}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {factKeys.map((fact) => (
                    <span
                      key={fact}
                      className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white/80"
                    >
                      {t(`facts.${fact}`)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900/70 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {t('resume.title')}
                </p>
                <p className="text-base text-slate-600 dark:text-slate-400">
                  {t('resume.subtitle')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton
                  href={resumeFiles[0].file}
                  download={resumeFiles[0].downloadName}
                  size="lg"
                  className="gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('downloadResume')}
                </LinkButton>
                <LinkButton
                  href={resumeFiles[1].file}
                  download={resumeFiles[1].downloadName}
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  <FileText className="w-5 h-5" />
                  {t('viewResume')}
                </LinkButton>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {resumeFiles.map((resume) => (
                <ResumePreviewCard
                  key={resume.key}
                  title={t(`resume.${resume.key}Label`)}
                  fileUrl={resume.file}
                  downloadName={resume.downloadName}
                  accent={resume.accent}
                  previewLabel={t('resume.preview')}
                  loadErrorLabel={t('resume.loadError')}
                  viewFullLabel={t('resume.viewFull')}
                  downloadLabel={t('resume.download')}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type ResumePreviewCardProps = {
  title: string;
  fileUrl: string;
  downloadName: string;
  accent: string;
  previewLabel: string;
  loadErrorLabel: string;
  viewFullLabel: string;
  downloadLabel: string;
};

function ResumePreviewCard({
  title,
  fileUrl,
  downloadName,
  accent,
  previewLabel,
  loadErrorLabel,
  viewFullLabel,
  downloadLabel
}: ResumePreviewCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className={clsx('absolute inset-0 opacity-70 bg-gradient-to-br', accent)} />
      <div className="relative flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{previewLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkButton
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
          >
            <FileText className="h-4 w-4" />
            {viewFullLabel}
          </LinkButton>
          <LinkButton
            href={fileUrl}
            download={downloadName}
            size="sm"
            className="gap-1.5 text-xs"
          >
            <Download className="h-4 w-4" />
            {downloadLabel}
          </LinkButton>
        </div>
      </div>
      <div className="relative mt-2 flex-1 overflow-hidden border-t border-white/20 bg-white/90 px-4 pb-4 pt-2 dark:bg-slate-950/40">
        <div className="pointer-events-none absolute inset-x-4 top-3 flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 shadow dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          {previewLabel}
        </div>
        {hasError ? (
          <div className="flex h-[24rem] items-center justify-center px-6 text-center text-sm text-slate-600 dark:text-slate-300">
            {loadErrorLabel}
          </div>
        ) : (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="mt-6 h-[24rem] w-full rounded-2xl border border-slate-200/70 bg-white shadow-inner dark:border-white/10 dark:bg-slate-950/30"
            title={`${title} preview`}
            loading="lazy"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}
