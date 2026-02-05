'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Calendar, MapPin, Briefcase, GraduationCap, Clock } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { experiences } from '@/data/experience';
import { formatDate } from '@/lib/utils';
import { DetailItem } from '../DetailsPane';

interface CareerContentProps {
    onSelectItem?: (item: DetailItem | null) => void;
    selectedId?: string | null;
}

type TabType = 'all' | 'work' | 'education';

export default function CareerContent({ onSelectItem, selectedId }: CareerContentProps) {
    const expT = useTranslations('experience');
    const locale = useLocale() as 'en' | 'fr';
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('all');

    const workExperiences = experiences.filter(exp => exp.type === 'work');
    const education = experiences.filter(exp => exp.type === 'education');

    // Combine and sort by date
    const allExperiences = [...experiences].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB.getTime() - dateA.getTime(); // Most recent first
    });

    const filteredExperiences = activeTab === 'all'
        ? allExperiences
        : allExperiences.filter(exp => exp.type === activeTab);

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
                { label: 'Type', value: exp.type === 'work' ? (exp.isInternship ? 'Internship' : 'Full-time') : 'Education' },
            ],
            type: exp.type === 'work' ? 'experience' : 'education',
        };
        onSelectItem?.(item);
    };

    const tabs = [
        { id: 'all' as TabType, label: 'Timeline', icon: Clock, count: allExperiences.length },
        { id: 'work' as TabType, label: 'Experience', icon: Briefcase, count: workExperiences.length },
        { id: 'education' as TabType, label: 'Education', icon: GraduationCap, count: education.length },
    ];

    return (
        <div className="space-y-4">
            {/* macOS-style Segmented Control */}
            <div className="flex justify-center">
                <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    'relative flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                                    isActive
                                        ? 'text-slate-800 dark:text-white'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-slate-700 rounded-md shadow-sm"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <Icon className={clsx('w-3.5 h-3.5 relative z-10', isActive && 'text-blue-500')} />
                                <span className="relative z-10">{tab.label}</span>
                                <span className={clsx(
                                    'relative z-10 px-1.5 py-0.5 rounded-full text-[10px]',
                                    isActive
                                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                                )}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Timeline View */}
            <div className="relative">
                {/* Timeline line */}
                {activeTab === 'all' && (
                    <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500 rounded-full" />
                )}

                <div className="space-y-3">
                    <AnimatePresence mode="wait">
                        {filteredExperiences.map((exp, index) => {
                            const isExpanded = expandedId === exp.id;
                            const isSelected = selectedId === exp.id;
                            const isWork = exp.type === 'work';

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ delay: index * 0.03 }}
                                    className={clsx(
                                        'relative rounded-xl border overflow-hidden transition-all duration-200',
                                        activeTab === 'all' && 'ml-10',
                                        isSelected
                                            ? 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-500/10 shadow-md'
                                            : 'border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm hover:border-slate-300 dark:hover:border-white/20 hover:shadow-sm'
                                    )}
                                >
                                    {/* Timeline dot */}
                                    {activeTab === 'all' && (
                                        <div className="absolute -left-10 top-5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center"
                                            style={{
                                                background: isWork
                                                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                                    : 'linear-gradient(135deg, #ec4899, #f43f5e)'
                                            }}
                                        >
                                            {isWork ? (
                                                <Briefcase className="w-2 h-2 text-white" />
                                            ) : (
                                                <GraduationCap className="w-2 h-2 text-white" />
                                            )}
                                        </div>
                                    )}

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
                                            <div className={clsx(
                                                'w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border overflow-hidden flex-shrink-0 flex items-center justify-center p-1',
                                                isWork ? 'border-blue-200 dark:border-blue-500/30' : 'border-rose-200 dark:border-rose-500/30'
                                            )}>
                                                <Image
                                                    src={exp.logo}
                                                    alt={exp.company[locale]}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className={clsx(
                                                'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                                                isWork
                                                    ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                                                    : 'bg-gradient-to-br from-rose-500 to-pink-500'
                                            )}>
                                                {isWork ? (
                                                    <Briefcase className="w-5 h-5 text-white" />
                                                ) : (
                                                    <GraduationCap className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="text-sm font-semibold text-slate-700 dark:text-white truncate">
                                                    {exp.title[locale]}
                                                </h4>
                                                {exp.isInternship && (
                                                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-medium">
                                                        Internship
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {exp.company[locale]}
                                            </p>
                                        </div>

                                        {/* Date & Type Badge */}
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                            <span className={clsx(
                                                'px-2 py-0.5 rounded-full text-[9px] font-medium',
                                                isWork
                                                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                                    : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                                            )}>
                                                {isWork ? 'Work' : 'Education'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                                                {formatDate(exp.startDate, locale)}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={clsx(
                                                'w-4 h-4 text-slate-400 transition-transform flex-shrink-0',
                                                isExpanded && 'rotate-180'
                                            )}
                                        />
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
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
