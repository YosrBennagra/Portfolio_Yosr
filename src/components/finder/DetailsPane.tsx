'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, ExternalLink, Link as LinkIcon } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

export interface DetailItem {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    date?: string;
    tags?: string[];
    links?: { label: string; url: string }[];
    metadata?: { label: string; value: string }[];
    type: 'project' | 'certificate' | 'skill' | 'experience' | 'education';
}

interface DetailsPaneProps {
    item: DetailItem | null;
    onClose?: () => void;
    className?: string;
}

export default function DetailsPane({ item, onClose, className }: DetailsPaneProps) {
    return (
        <div
            className={clsx(
                'w-72 lg:w-80 flex-shrink-0 flex flex-col',
                'bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-xl',
                'border-l border-slate-200/60 dark:border-white/5',
                'overflow-hidden',
                className
            )}
        >
            <AnimatePresence mode="wait">
                {item ? (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full overflow-y-auto"
                    >
                        {/* Header with close button */}
                        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200/40 dark:border-white/5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Details
                            </span>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
                                    aria-label="Close details"
                                >
                                    <X className="w-4 h-4 text-slate-400" />
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {/* Preview Image */}
                            {item.image && (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Title & Subtitle */}
                            <div>
                                <h3 className="text-base font-semibold text-slate-800 dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                {item.subtitle && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {item.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Date */}
                            {item.date && (
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{item.date}</span>
                                </div>
                            )}

                            {/* Description */}
                            {item.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {item.description}
                                </p>
                            )}

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                                        <Tag className="w-3.5 h-3.5" />
                                        <span>Tags</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-[10px] font-medium rounded-md bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            {item.metadata && item.metadata.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                                    {item.metadata.map((meta) => (
                                        <div key={meta.label} className="flex justify-between text-xs">
                                            <span className="text-slate-400 dark:text-slate-500">{meta.label}</span>
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">{meta.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Links */}
                            {item.links && item.links.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                                        <LinkIcon className="w-3.5 h-3.5" />
                                        <span>Links</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {item.links.map((link) => (
                                            <a
                                                key={link.url}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors group"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {link.label}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-slate-300 dark:text-slate-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                            No Selection
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            Select an item to see details
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
