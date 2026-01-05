'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, Sparkles, Eye, Folder, Code, FileText, ChevronLeft, ChevronRight, X, Play, Images } from 'lucide-react';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';
import { formatDate } from '@/lib/utils';

type Category = 'all' | 'web' | 'mobile' | 'fullstack';

export default function ProjectsCertificates() {
    const t = useTranslations('projects');
    const certT = useTranslations('certificates');
    const locale = useLocale() as 'en' | 'fr';
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showGallery, setShowGallery] = useState(false);

    const categories: Category[] = ['all', 'web', 'mobile', 'fullstack'];
    const filteredProjects = activeCategory === 'all'
        ? projects.slice(0, 6)
        : projects.filter(p => p.category === activeCategory).slice(0, 6);

    const activeProject = projects.find(p => p.id === selectedProject);

    const openGallery = (projectId: string, index: number = 0) => {
        setSelectedProject(projectId);
        setGalleryIndex(index);
        setShowGallery(true);
    };

    const closeGallery = () => {
        setShowGallery(false);
        setGalleryIndex(0);
    };

    const nextImage = () => {
        if (activeProject?.gallery) {
            setGalleryIndex((prev) => (prev + 1) % activeProject.gallery!.length);
        }
    };

    const prevImage = () => {
        if (activeProject?.gallery) {
            setGalleryIndex((prev) => (prev - 1 + activeProject.gallery!.length) % activeProject.gallery!.length);
        }
    };

    return (
        <>
            <section id="projects" className="relative py-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950" />
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px]" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Featured Projects
                        </h2>
                        <p className="text-white/50 max-w-xl mx-auto text-sm">
                            Full-stack development, AI integration, and creative problem-solving
                        </p>
                    </motion.div>

                    {/* Category Pills */}
                    <div className="flex justify-center gap-2 mb-10">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-gradient-to-r from-blue-500/80 to-violet-500/80 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {t(`categories.${category}`)}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid - Full Width */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => {
                                const isFeatured = project.featured;
                                const hasGallery = project.gallery && project.gallery.length > 0;
                                const hasReport = project.links.report;
                                const hasVideo = project.links.demo?.endsWith('.mp4');

                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`group relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all ${isFeatured && index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                                            }`}
                                    >
                                        {/* Image */}
                                        <div className={`relative overflow-hidden ${isFeatured && index === 0 ? 'aspect-[21/10]' : 'aspect-video'}`}>
                                            <Image
                                                src={project.image}
                                                alt={project.title[locale]}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, 50vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                            {/* Featured Badge */}
                                            {isFeatured && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold">
                                                        <Sparkles className="w-3 h-3" /> Featured
                                                    </span>
                                                </div>
                                            )}

                                            {/* Category */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-xs font-medium text-white/90 capitalize">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Gallery/Media Indicator */}
                                            {(hasGallery || hasVideo) && (
                                                <div className="absolute bottom-4 left-4 flex gap-2">
                                                    {hasGallery && (
                                                        <button
                                                            onClick={() => openGallery(project.id)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-white text-xs hover:bg-black/70 transition-colors"
                                                        >
                                                            <Images className="w-3.5 h-3.5" />
                                                            {project.gallery!.length} images
                                                        </button>
                                                    )}
                                                    {hasVideo && (
                                                        <button
                                                            onClick={() => window.open(project.links.demo, '_blank')}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/80 backdrop-blur text-white text-xs hover:bg-blue-500 transition-colors"
                                                        >
                                                            <Play className="w-3.5 h-3.5" /> Demo Video
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content - Always Visible */}
                                        <div className="p-5 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                                    {project.title[locale]}
                                                </h3>
                                                <p className="text-sm text-white/60 leading-relaxed">
                                                    {project.description[locale]}
                                                </p>
                                            </div>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.slice(0, 6).map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/50 font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 6 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/40">
                                                        +{project.tags.length - 6}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.links.demo && !hasVideo && (
                                                    <button
                                                        onClick={() => window.open(project.links.demo, '_blank')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" /> Live Demo
                                                    </button>
                                                )}
                                                {project.links.github && (
                                                    <button
                                                        onClick={() => window.open(project.links.github, '_blank')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-medium hover:bg-white/10 transition-colors"
                                                    >
                                                        <Code className="w-3.5 h-3.5" /> Code
                                                    </button>
                                                )}
                                                {hasReport && (
                                                    <button
                                                        onClick={() => window.open(project.links.report, '_blank')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" /> View Report
                                                    </button>
                                                )}
                                                {project.links.presentation && (
                                                    <button
                                                        onClick={() => window.open(project.links.presentation, '_blank')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" /> Presentation
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Certificates Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        id="certificates"
                        className="relative"
                    >
                        {/* Certificates Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                                <Award className="w-4 h-4 text-amber-400" />
                                <span className="text-sm text-amber-300/80">{certificates.length} Certifications</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{certT('title')}</h2>
                            <p className="text-white/50 text-sm">{certT('subtitle')}</p>
                        </div>

                        {/* Certificates Grid - Card Style */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {certificates.map((certificate, index) => {
                                const issued = certificate.issueDate ? formatDate(certificate.issueDate, locale) : null;

                                return (
                                    <motion.div
                                        key={certificate.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                                    >
                                        {/* Badge Tag */}
                                        {certificate.badge && (
                                            <div className="absolute -top-2 -right-2">
                                                <span className="px-2 py-1 rounded-full bg-amber-500/90 text-[9px] font-bold text-white uppercase tracking-wider shadow-lg">
                                                    {certificate.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                                            <Award className="w-6 h-6 text-amber-400" />
                                        </div>

                                        {/* Content */}
                                        <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-amber-300 transition-colors line-clamp-2">
                                            {certificate.title[locale]}
                                        </h4>
                                        <p className="text-xs text-amber-400/70 mb-2">{certificate.issuer[locale]}</p>

                                        {/* Tags */}
                                        {certificate.tags && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {certificate.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-white/40">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                            {issued && (
                                                <span className="text-[10px] text-white/40">{issued}</span>
                                            )}
                                            {certificate.credentialUrl && (
                                                <button
                                                    onClick={() => window.open(certificate.credentialUrl, '_blank')}
                                                    className="text-[10px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 transition-colors"
                                                >
                                                    Verify <ExternalLink className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-amber-500/5 to-transparent" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Modal */}
            <AnimatePresence>
                {showGallery && activeProject?.gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                        onClick={closeGallery}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeGallery}
                                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image */}
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                                <Image
                                    src={activeProject.gallery[galleryIndex]}
                                    alt={`${activeProject.title[locale]} - Image ${galleryIndex + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Navigation */}
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <button
                                    onClick={prevImage}
                                    className="p-3 m-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button
                                    onClick={nextImage}
                                    className="p-3 m-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex justify-center gap-2 mt-4 overflow-x-auto py-2">
                                {activeProject.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setGalleryIndex(idx)}
                                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${idx === galleryIndex ? 'border-blue-500 scale-110' : 'border-white/20 opacity-50 hover:opacity-100'
                                            }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Counter */}
                            <div className="text-center mt-4 text-white/60 text-sm">
                                {galleryIndex + 1} / {activeProject.gallery.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
