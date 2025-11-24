'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, PlayCircle, FileText, X, ExternalLink, ChevronLeft, ChevronRight, Presentation, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Project } from '@/types';

const ReportViewer = dynamic(() => import('@/components/sections/ReportViewer'), {
  ssr: false
});

type Category = 'all' | 'web' | 'mobile' | 'fullstack';

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale() as 'en' | 'fr';
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: Category[] = ['all', 'web', 'mobile', 'fullstack'];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 max-w-6xl mx-auto"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">{t('noProjects')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, locale }: { project: Project; locale: 'en' | 'fr' }) {
  const t = useTranslations('projects');
  const [reportOpen, setReportOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{
    url: string;
    labelKey: 'viewDemo' | 'viewDevopsDemo';
  } | null>(null);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const slides = hasGallery ? project.gallery! : [project.image];
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const demoUrl = project.links.demo;
  const devopsUrl = project.links.devopsDemo;
  const presentationUrl = project.links.presentation;
  const isVideoUrl = (url?: string) => Boolean(url && /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url));

  const handleReportDownload = (reportUrl: string) => {
    const anchor = document.createElement('a');
    anchor.href = reportUrl;
    anchor.download = reportUrl.split('/').pop() ?? 'report.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDemoClick = (url?: string, labelKey: 'viewDemo' | 'viewDevopsDemo' = 'viewDemo') => {
    if (!url) return;
    if (isVideoUrl(url)) {
      setVideoModal({ url, labelKey });
      return;
    }
    window.open(url, '_blank');
  };

  const nextSlide = () => {
    setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      <motion.div variants={fadeInUp}>
        <div className="relative h-full flex flex-col rounded-3xl border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden">
          <div
            className="relative w-full h-[420px] md:h-[520px] bg-gradient-to-br from-slate-950 via-slate-900 to-black dark:from-slate-900 dark:via-black dark:to-slate-950 flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_55%)]" />
            {project.showPlaceholder ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <p className="text-lg font-semibold">{t('previewComingSoonTitle')}</p>
                <p className="text-sm text-white/80 mt-2">{t('previewComingSoonCaption')}</p>
              </div>
            ) : (
              <div className="relative w-full h-full px-6 py-8">
                <Image
                  key={slides[activeSlide]}
                  src={slides[activeSlide]}
                  alt={`${project.title[locale]} screenshot ${activeSlide + 1}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain"
                  priority={project.featured}
                />
              </div>
            )}

            {!project.showPlaceholder && slides.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/70 p-3 text-slate-700 dark:text-white shadow-lg hover:scale-105"
                  onClick={prevSlide}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-slate-900/70 p-3 text-slate-700 dark:text-white shadow-lg hover:scale-105"
                  onClick={nextSlide}
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, idx) => (
                    <span
                      key={`${project.id}-dot-${idx}`}
                      className={`h-2.5 w-2.5 rounded-full ${idx === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{project.title[locale]}</h3>

              <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">{project.description[locale]}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {demoUrl && (
                  <Button size="sm" className="flex-1 min-w-[160px] gap-2" onClick={() => handleDemoClick(demoUrl, 'viewDemo')}>
                    <PlayCircle className="w-4 h-4" />
                    {t('viewDemo')}
                  </Button>
                )}
                {presentationUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 min-w-[160px] gap-2"
                    onClick={() => window.open(presentationUrl, '_blank')}
                  >
                    <Presentation className="w-4 h-4" />
                    {t('viewPresentation')}
                  </Button>
                )}
                {devopsUrl && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 min-w-[160px] gap-2"
                    onClick={() => handleDemoClick(devopsUrl, 'viewDevopsDemo')}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {t('viewDevopsDemo')}
                  </Button>
                )}
                {(project.links.report || project.links.reportDownload) && (
                  <Button size="sm" variant="outline" className="flex-1 min-w-[160px] gap-2" onClick={() => setReportOpen(true)}>
                    <FileText className="w-4 h-4" />
                    {t('viewReport')}
                  </Button>
                )}
                {project.links.github && (
                  <Button size="sm" variant="outline" className="flex-1 min-w-[160px] gap-2" onClick={() => window.open(project.links.github!, '_blank')}>
                    <Github className="w-4 h-4" />
                    {t('viewCode')}
                  </Button>
                )}
              </div>
            </div>
        </div>
      </motion.div>

      <ProjectReportModal
        title={project.title[locale]}
        reportUrl={project.links.report}
        reportDownloadUrl={project.links.reportDownload}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onDownload={handleReportDownload}
      />
      {videoModal && (
        <VideoPlayerModal
          title={project.title[locale]}
          videoUrl={videoModal.url}
          labelKey={videoModal.labelKey}
          onClose={() => setVideoModal(null)}
        />
      )}
    </>
  );
}

type ReportProps = {
  title: string;
  reportUrl?: string;
  reportDownloadUrl?: string;
  open: boolean;
  onClose: () => void;
  onDownload: (url: string) => void;
};

function ProjectReportModal({ title, reportUrl, reportDownloadUrl, open, onClose, onDownload }: ReportProps) {
  const t = useTranslations('projects');
  const pdfSource = reportDownloadUrl ?? reportUrl;

  if (!open || !pdfSource) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">{title}</p>
              <h4 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{t('reportTitle')}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('reportSubtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close report viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
            <ReportViewer fileUrl={pdfSource} />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" className="flex-1 min-w-[160px] gap-2" onClick={() => window.open(reportUrl ?? pdfSource, '_blank')}>
              <ExternalLink className="w-4 h-4" />
              {t('openPdf')}
            </Button>
            {reportDownloadUrl && (
              <Button size="sm" variant="outline" className="flex-1 min-w-[160px] gap-2" onClick={() => onDownload(reportDownloadUrl)}>
                <FileText className="w-4 h-4" />
                {t('downloadPdf')}
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

type VideoModalProps = {
  title: string;
  videoUrl: string;
  labelKey: 'viewDemo' | 'viewDevopsDemo';
  onClose: () => void;
};

function VideoPlayerModal({ title, videoUrl, labelKey, onClose }: VideoModalProps) {
  const t = useTranslations('projects');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">{title}</p>
              <h4 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{t(labelKey)}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('videoSubtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video
              src={videoUrl}
              controls
              controlsList="nodownload"
              playsInline
              className="h-full w-full"
              preload="metadata"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <Button size="sm" variant="outline" className="flex-1 min-w-[160px] gap-2" onClick={() => window.open(videoUrl, '_blank')}>
              <ExternalLink className="w-4 h-4" />
              {t('openPdf')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

