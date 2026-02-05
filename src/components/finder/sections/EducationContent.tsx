'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Calendar, MapPin, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { experiences } from '@/data/experience';
import { formatDate } from '@/lib/utils';
import { DetailItem } from '../DetailsPane';

interface EducationContentProps {
    onSelectItem?: (item: DetailItem | null) => void;
    selectedId?: string | null;
}

export default function EducationContent({ onSelectItem, selectedId }: EducationContentProps) {
    const expT = useTranslations('experience');
    const locale = useLocale() as 'en' | 'fr';
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const education = experiences.filter(exp => exp.type === 'education');

    const handleSelect = (exp: typeof experiences[0]) => {
        const item: DetailItem = {
            id: exp.id,
            title: exp.title[locale],
            subtitle: exp.company[locale],
            description: exp.description[locale],
            image: exp.logo,
            date: `${formatDate(exp.startDate, locale)} — ${exp.endDate === 'present' ? expT('present') : formatDate(exp.endDate, locale)}`,
            tags: exp.highlights?.[locale] || [],
            metadata: [
                { label: 'Location', value: exp.location[locale] },
                { label: 'Type', value: 'Education' },
            ],
            type: 'education',
        };
        onSelectItem?.(item);
    };

    return (
        <div className="space-y-3">
            {education.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <GraduationCap className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No education entries found</p>
                </div>
            ) : (
                education.map((exp, index) => {
                    const isExpanded = expandedId === exp.id;
                    const isSelected = selectedId === exp.id;

                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={clsx(
                                'rounded-xl border overflow-hidden transition-all duration-200',
                                isSelected
                                    ? 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-500/10'
                                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                            )}
                        >
                            {/* Header */}
                            <button
                                onClick={() => {
                                    setExpandedId(isExpanded ? null : exp.id);
                                    handleSelect(exp);
                                }}
                                className="w-full flex items-center gap-3 p-4 text-left"
                            >
                                {/* Logo */}
                                {exp.logo ? (
                                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                                        <Image
                                            src={exp.logo}
                                            alt={exp.company[locale]}
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-700 dark:text-white truncate">
                                        {exp.title[locale]}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {exp.company[locale]}
                                    </p>
                                </div>

                                {/* Date & Expand */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                                        {formatDate(exp.startDate, locale)} — {exp.endDate === 'present' ? expT('present') : formatDate(exp.endDate, locale)}
                                    </span>
                                    <ChevronDown
                                        className={clsx(
                                            'w-4 h-4 text-slate-400 transition-transform',
                                            isExpanded && 'rotate-180'
                                        )}
                                    />
                                </div>
                            </button>

                            {/* Expandable Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-white/5">
                                            {/* Meta info */}
                                            <div className="flex flex-wrap gap-3 mb-3 pt-3">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(exp.startDate, locale)} — {exp.endDate === 'present' ? expT('present') : formatDate(exp.endDate, locale)}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {exp.location[locale]}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                                                {exp.description[locale]}
                                            </p>

                                            {/* Highlights */}
                                            {exp.highlights && (
                                                <ul className="space-y-1.5">
                                                    {exp.highlights[locale].map((highlight, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}
