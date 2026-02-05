'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Play, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { projects } from '@/data/projects';
import { DetailItem } from '../DetailsPane';

type Category = 'all' | 'web' | 'mobile' | 'fullstack';

interface ProjectsContentProps {
    onSelectItem?: (item: DetailItem | null) => void;
    selectedId?: string | null;
}

export default function ProjectsContent({ onSelectItem, selectedId }: ProjectsContentProps) {
    const t = useTranslations('projects');
    const locale = useLocale() as 'en' | 'fr';
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [galleryProject, setGalleryProject] = useState<string | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const categories: Category[] = ['all', 'web', 'mobile', 'fullstack'];
    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const activeGalleryProject = projects.find(p => p.id === galleryProject);

    const handleSelect = (project: typeof projects[0]) => {
        const links = [];
        if (project.links.demo) links.push({ label: 'Demo', url: project.links.demo });
        if (project.links.github) links.push({ label: 'GitHub', url: project.links.github });
        if (project.links.report) links.push({ label: 'Report', url: project.links.report });
        if (project.links.presentation) links.push({ label: 'Presentation', url: project.links.presentation });

        const item: DetailItem = {
            id: project.id,
            title: project.title[locale],
            description: project.description[locale],
            image: project.image,
            tags: project.tags,
            links,
            metadata: [
                { label: 'Category', value: project.category },
                { label: 'Featured', value: project.featured ? 'Yes' : 'No' },
            ],
            type: 'project',
        };
        onSelectItem?.(item);
    };

    const openGallery = (projectId: string, index: number = 0) => {
        setGalleryProject(projectId);
        setGalleryIndex(index);
    };

    const closeGallery = () => {
        setGalleryProject(null);
        setGalleryIndex(0);
    };

    const nextImage = () => {
        if (activeGalleryProject?.gallery) {
            setGalleryIndex((prev) => (prev + 1) % activeGalleryProject.gallery!.length);
        }
    };

    const prevImage = () => {
        if (activeGalleryProject?.gallery) {
            setGalleryIndex((prev) => (prev - 1 + activeGalleryProject.gallery!.length) % activeGalleryProject.gallery!.length);
        }
    };

    return (
        <>
            <div className="space-y-4">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={clsx(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                                activeCategory === category
                                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                            )}
                        >
                            {t(`categories.${category}`)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const isSelected = selectedId === project.id;
                            const hasGallery = project.gallery && project.gallery.length > 0;
                            const hasVideo = project.links.demo?.endsWith('.mp4');

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleSelect(project)}
                                    className={clsx(
                                        'group relative rounded-xl overflow-hidden cursor-pointer',
                                        'border transition-all duration-200',
                                        isSelected
                                            ? 'border-blue-500/50 ring-2 ring-blue-500/20'
                                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                                    )}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={project.image}
                                            alt={project.title[locale]}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <div className="absolute top-2 right-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-semibold">
                                                    <Sparkles className="w-2.5 h-2.5" /> Featured
                                                </span>
                                            </div>
                                        )}

                                        {/* Category */}
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur text-[10px] font-medium text-white/90 capitalize">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Media Actions */}
                                        {(hasGallery || hasVideo) && (
                                            <div className="absolute bottom-2 left-2 flex gap-1.5">
                                                {hasGallery && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openGallery(project.id);
                                                        }}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[10px] hover:bg-black/70 transition-colors"
                                                    >
                                                        <Images className="w-3 h-3" />
                                                        {project.gallery!.length}
                                                    </button>
                                                )}
                                                {hasVideo && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(project.links.demo, '_blank');
                                                        }}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/80 backdrop-blur text-white text-[10px] hover:bg-blue-500 transition-colors"
                                                    >
                                                        <Play className="w-3 h-3" /> Demo
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 bg-white dark:bg-slate-800/50">
                                        <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {project.title[locale]}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                                            {project.description[locale]}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.slice(0, 4).map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] text-slate-500 dark:text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 4 && (
                                                <span className="px-1.5 py-0.5 text-[9px] text-slate-400 dark:text-slate-500">
                                                    +{project.tags.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Gallery Modal */}
            <AnimatePresence>
                {galleryProject && activeGalleryProject?.gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        onClick={closeGallery}
                    >
                        <button
                            onClick={closeGallery}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <motion.div
                            key={galleryIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative max-w-4xl max-h-[80vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={activeGalleryProject.gallery[galleryIndex]}
                                alt={`${activeGalleryProject.title[locale]} - Image ${galleryIndex + 1}`}
                                width={1200}
                                height={800}
                                className="object-contain rounded-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm">
                                {galleryIndex + 1} / {activeGalleryProject.gallery.length}
                            </div>
                        </motion.div>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
