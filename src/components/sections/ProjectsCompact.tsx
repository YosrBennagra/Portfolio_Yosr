'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, PlayCircle, FileText, X, ExternalLink, Presentation, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { fadeInUp } from '@/lib/animations';
import type { Project } from '@/types';

const ReportViewer = dynamic(() => import('@/components/sections/ReportViewer'), {
    ssr: false
});

type Category = 'all' | 'web' | 'mobile' | 'fullstack';

export default function ProjectsCompact() {
    const t = useTranslations('projects');
    const locale = useLocale() as 'en' | 'fr';
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [expandedProject, setExpandedProject] = useState<string | null>(null);

    const categories: Category[] = ['all', 'web', 'mobile', 'fullstack'];

    const filteredProjects =
        activeCategory === 'all'
            ? projects
            : projects.filter(project => project.category === activeCategory);

    return (
        <section id="projects" className="py-10 md:py-12 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
                >
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {t('title')}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeCategory === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {t(`categories.${category}`)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid - Masonry-like with hover expand */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectTile
                                key={project.id}
                                project={project}
                                locale={locale}
                                index={index}
                                isExpanded={expandedProject === project.id}
                                onExpand={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectTile({
    project,
    locale,
    index,
    isExpanded,
    onExpand
}: {
    project: Project;
    locale: 'en' | 'fr';
    index: number;
    isExpanded: boolean;
    onExpand: () => void;
}) {
    const t = useTranslations('projects');
    const [reportOpen, setReportOpen] = useState(false);
    const [videoModal, setVideoModal] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const demoUrl = project.links.demo;
    const devopsUrl = project.links.devopsDemo;
    const presentationUrl = project.links.presentation;
    const isVideoUrl = (url?: string) => Boolean(url && /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url));

    const handleDemoClick = (e: React.MouseEvent, url?: string) => {
        e.stopPropagation();
        if (!url) return;
        if (isVideoUrl(url)) {
            setVideoModal(url);
            return;
        }
        window.open(url, '_blank');
    };

    // Image navigation
    const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
    const hasMultipleImages = images.length > 1;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    // Featured projects span 2 columns
    const isFeatured = project.featured && index < 2;

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={onExpand}
                className={`
          relative group cursor-pointer rounded-xl overflow-hidden
          bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
          ${isFeatured ? 'col-span-2 row-span-2' : ''}
          ${isExpanded ? 'col-span-2 md:col-span-2 row-span-2 z-10' : ''}
        `}
                style={{
                    aspectRatio: isExpanded ? '16/10' : isFeatured ? '16/12' : '4/3',
                }}
            >
                {/* Background Image with Navigation */}
                <div className="absolute inset-0">
                    {!project.showPlaceholder && (
                        <>
                            <Image
                                src={images[currentImageIndex]}
                                alt={`${project.title[locale]} - Image ${currentImageIndex + 1}`}
                                fill
                                sizes={isFeatured || isExpanded ? '50vw' : '25vw'}
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                key={currentImageIndex}
                            />

                            {/* Image Navigation - Only show when expanded or featured with multiple images */}
                            {hasMultipleImages && (isExpanded || isFeatured) && (
                                <>
                                    {/* Previous/Next Buttons */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all z-20"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all z-20"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>

                                    {/* Image Dots */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => goToImage(e, idx)}
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex
                                                        ? 'bg-white w-4'
                                                        : 'bg-white/50 hover:bg-white/75'
                                                    }`}
                                                aria-label={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wider text-white">
                            {project.category}
                        </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-[9px] font-bold uppercase tracking-wider text-white">
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Title & Description */}
                    <div className="space-y-1">
                        <h3 className={`font-bold text-white leading-tight ${isExpanded || isFeatured ? 'text-lg' : 'text-sm'}`}>
                            {project.title[locale]}
                        </h3>

                        <AnimatePresence>
                            {(isExpanded || isFeatured) && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-xs text-white/80 line-clamp-2"
                                >
                                    {project.description[locale]}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Tags - Only show on expanded/featured */}
                        <AnimatePresence>
                            {(isExpanded || isFeatured) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-wrap gap-1 pt-1"
                                >
                                    {project.tags.slice(0, 4).map(tag => (
                                        <span key={tag} className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/70">
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action Buttons - Only on expanded */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="flex flex-wrap gap-1.5 pt-2"
                                >
                                    {demoUrl && (
                                        <button
                                            onClick={(e) => handleDemoClick(e, demoUrl)}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            <PlayCircle className="w-3 h-3" />
                                            Demo
                                        </button>
                                    )}
                                    {project.links.github && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); window.open(project.links.github!, '_blank'); }}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 text-white text-[10px] font-medium hover:bg-white/30 transition-colors"
                                        >
                                            <Github className="w-3 h-3" />
                                            Code
                                        </button>
                                    )}
                                    {(project.links.report || project.links.reportDownload) && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setReportOpen(true); }}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 text-white text-[10px] font-medium hover:bg-white/30 transition-colors"
                                        >
                                            <FileText className="w-3 h-3" />
                                            Report
                                        </button>
                                    )}
                                    {presentationUrl && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); window.open(presentationUrl, '_blank'); }}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 text-white text-[10px] font-medium hover:bg-white/30 transition-colors"
                                        >
                                            <Presentation className="w-3 h-3" />
                                            Slides
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-colors pointer-events-none" />
            </motion.div>

            {/* Report Modal */}
            {reportOpen && (
                <ReportModal
                    title={project.title[locale]}
                    reportUrl={project.links.report}
                    reportDownloadUrl={project.links.reportDownload}
                    onClose={() => setReportOpen(false)}
                />
            )}

            {/* Video Modal */}
            {videoModal && (
                <VideoModal
                    title={project.title[locale]}
                    videoUrl={videoModal}
                    onClose={() => setVideoModal(null)}
                />
            )}
        </>
    );
}

function ReportModal({ title, reportUrl, reportDownloadUrl, onClose }: {
    title: string;
    reportUrl?: string;
    reportDownloadUrl?: string;
    onClose: () => void;
}) {
    const t = useTranslations('projects');
    const pdfSource = reportDownloadUrl ?? reportUrl;
    if (!pdfSource) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-4xl max-h-[85vh] rounded-xl bg-slate-900 p-4 shadow-2xl flex flex-col"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-xs text-blue-400 uppercase tracking-wide">{title}</p>
                        <h4 className="text-lg font-semibold text-white">{t('reportTitle')}</h4>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 rounded-lg overflow-hidden bg-slate-950">
                    <ReportViewer fileUrl={pdfSource} />
                </div>
                <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 gap-1.5" onClick={() => window.open(reportUrl ?? pdfSource, '_blank')}>
                        <ExternalLink className="w-3.5 h-3.5" /> Open
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function VideoModal({ title, videoUrl, onClose }: {
    title: string;
    videoUrl: string;
    onClose: () => void;
}) {
    const t = useTranslations('projects');

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-3xl rounded-xl bg-slate-900 p-4 shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{title}</h4>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <video src={videoUrl} controls className="w-full h-full" preload="metadata" />
                </div>
            </motion.div>
        </motion.div>
    );
}
