'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Wrench, Briefcase, GraduationCap, Calendar, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { formatDate } from '@/lib/utils';
import { fadeInLeft, fadeInRight } from '@/lib/animations';
import Badge from '@/components/ui/Badge';
import LogoLoop from '@/components/ui/reactbits/LogoLoop';

type Category = 'frontend' | 'backend' | 'tools';

const SECTION_META: Record<Category, { accent: string; icon: React.ElementType; gradient: string }> = {
    frontend: {
        accent: 'bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-500',
        icon: Monitor,
        gradient: 'from-blue-500/20 to-transparent'
    },
    backend: {
        accent: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-400',
        icon: Server,
        gradient: 'from-emerald-500/20 to-transparent'
    },
    tools: {
        accent: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
        icon: Wrench,
        gradient: 'from-orange-500/20 to-transparent'
    }
};

const EXPERT_SKILLS = new Set([
    'React', 'TypeScript', 'Next.js', 'Spring Boot', 'NestJS', 'Node.js',
    'Express', 'RESTful APIs', 'Python/Flask', 'MongoDB', 'MySQL', 'NoSQL',
    'PostgreSQL', 'Jenkins', 'SonarQube', 'Grafana', 'Prometheus',
    'Unit Testing', 'GitHub Actions', 'CI/CD Pipelines', 'Docker', 'AI Fine-Tuning'
]);

export default function SkillsExperience() {
    const t = useTranslations('skills');
    const expT = useTranslations('experience');
    const locale = useLocale() as 'en' | 'fr';
    const [expandedExp, setExpandedExp] = useState<string | null>(null);
    const [expandedEdu, setExpandedEdu] = useState<string | null>(null);

    const workExperiences = experiences.filter(exp => exp.type === 'work');
    const education = experiences.filter(exp => exp.type === 'education');

    // Show ALL skills - no slicing
    const skillsByCategory = {
        frontend: skills.filter(s => s.category === 'frontend').sort((a, b) => b.level - a.level),
        backend: skills.filter(s => s.category === 'backend').sort((a, b) => b.level - a.level),
        tools: skills.filter(s => s.category === 'tools').sort((a, b) => b.level - a.level),
    };

    const toggleExpanded = (id: string, type: 'work' | 'edu') => {
        if (type === 'work') {
            setExpandedExp(expandedExp === id ? null : id);
        } else {
            setExpandedEdu(expandedEdu === id ? null : id);
        }
    };

    return (
        <section id="skills" className="relative py-16 overflow-hidden">
            {/* Background Effects - Light/Dark Mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
            <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-30" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[150px]" />

            {/* Decorative geometric shapes */}
            <div className="absolute top-20 right-10 w-24 h-24 border border-blue-400/30 dark:border-blue-500/20 rotate-45 hidden lg:block" />
            <div className="absolute bottom-40 left-10 w-16 h-16 border-2 border-purple-400/30 dark:border-purple-500/20 rounded-full hidden lg:block" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 mb-4"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-slate-600 dark:text-white/70">Technical Expertise</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                        Skills & Experience
                    </h2>
                    <p className="text-slate-500 dark:text-white/50 text-sm max-w-2xl mx-auto">
                        Technical expertise meets real-world experience
                    </p>
                </motion.div>

                {/* Logo Loop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-10"
                >
                    <LogoLoop />
                </motion.div>

                {/* Side by Side Layout */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Left Column - ALL Skills */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white relative">
                                {t('title')}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-white/40 ml-auto bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full border border-slate-200 dark:border-white/10">
                                {skills.length} total skills
                            </span>
                        </div>

                        <div className="grid gap-3">
                            {(['frontend', 'backend', 'tools'] as Category[]).map((category) => {
                                const meta = SECTION_META[category];
                                const Icon = meta.icon;
                                const categorySkills = skillsByCategory[category];

                                return (
                                    <motion.div
                                        key={category}
                                        whileHover={{ scale: 1.01 }}
                                        className="group p-4 rounded-xl bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 relative overflow-hidden hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none"
                                    >
                                        {/* Glass card effect with corner accent */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent" />
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl" />
                                        <div className={clsx('absolute inset-0 opacity-30 bg-gradient-to-br', meta.gradient)} />

                                        <div className="relative">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center text-white', meta.accent)}>
                                                    <Icon className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-white">
                                                    {t(`categories.${category}`)}
                                                </span>
                                                <span className="text-[10px] text-slate-400 dark:text-white/40 ml-auto">
                                                    {categorySkills.length} skills
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5">
                                                {categorySkills.map((skill) => {
                                                    const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;
                                                    return (
                                                        <motion.span
                                                            key={skill.name}
                                                            whileHover={{ scale: 1.08 }}
                                                            className={clsx(
                                                                'px-2 py-1 rounded-full text-[10px] font-medium transition-all cursor-default',
                                                                isExpert
                                                                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30'
                                                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                                                            )}
                                                        >
                                                            {skill.name}
                                                            {isExpert && <span className="ml-1 w-1 h-1 inline-block rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />}
                                                        </motion.span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column - Experience with Dropdowns */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                        id="experience"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white relative">
                                {expT('title')}
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-transparent" />
                            </h3>
                        </div>

                        {/* Work Experience with Dropdown */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/70">
                                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                                    <Briefcase className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                                </div>
                                <span className="font-medium">{expT('work')}</span>
                            </div>

                            <div className="space-y-2 pl-6 border-l border-slate-200 dark:border-white/10">
                                {workExperiences.map((exp, index) => {
                                    const isExpanded = expandedExp === exp.id;
                                    const highlights = exp.highlights?.[locale] || [];

                                    return (
                                        <motion.div
                                            key={exp.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            {/* Timeline dot */}
                                            <div className={clsx(
                                                "absolute -left-[25px] top-4 w-2 h-2 rounded-full transition-all duration-300",
                                                isExpanded ? "bg-blue-400 scale-150" : "bg-blue-500"
                                            )} />

                                            <motion.div
                                                onClick={() => toggleExpanded(exp.id, 'work')}
                                                className={clsx(
                                                    "p-3 rounded-lg border transition-all cursor-pointer",
                                                    isExpanded
                                                        ? "bg-blue-50 dark:bg-white/10 border-blue-300 dark:border-blue-500/30"
                                                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {exp.logo && (
                                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-white/10 flex-shrink-0">
                                                            <Image
                                                                src={exp.logo}
                                                                alt={exp.company[locale]}
                                                                fill
                                                                className="object-contain p-1"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h4 className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                                                {exp.title[locale]}
                                                            </h4>
                                                            {exp.isInternship && (
                                                                <Badge variant="secondary" className="text-[8px] px-1.5 py-0">
                                                                    {expT('internship')}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-blue-500 dark:text-blue-400">{exp.company[locale]}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/40">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>
                                                                    {formatDate(exp.startDate, locale)} - {exp.endDate === 'present' ? expT('present') : formatDate(exp.endDate, locale)}
                                                                </span>
                                                            </div>
                                                            {highlights.length > 0 && (
                                                                <motion.div
                                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-white/40" />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Dropdown Content */}
                                                <AnimatePresence>
                                                    {isExpanded && highlights.length > 0 && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                                                                <p className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                                                                    Key Accomplishments
                                                                </p>
                                                                {highlights.map((highlight, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                                                        <span className="text-xs text-white/70">{highlight}</span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Education with Dropdown */}
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                                </div>
                                <span className="font-medium">{expT('education')}</span>
                            </div>

                            <div className="space-y-2 pl-6 border-l border-white/10">
                                {education.map((exp, index) => {
                                    const isExpanded = expandedEdu === exp.id;
                                    const highlights = exp.highlights?.[locale] || [];

                                    return (
                                        <motion.div
                                            key={exp.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            <div className={clsx(
                                                "absolute -left-[25px] top-4 w-2 h-2 rounded-full transition-all duration-300",
                                                isExpanded ? "bg-purple-400 scale-150" : "bg-purple-500"
                                            )} />

                                            <motion.div
                                                onClick={() => toggleExpanded(exp.id, 'edu')}
                                                className={clsx(
                                                    "p-3 rounded-lg border transition-all cursor-pointer",
                                                    isExpanded
                                                        ? "bg-white/10 border-purple-500/30"
                                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {exp.logo && (
                                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                                                            <Image
                                                                src={exp.logo}
                                                                alt={exp.company[locale]}
                                                                fill
                                                                className="object-contain p-1"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold text-white truncate">
                                                            {exp.title[locale]}
                                                        </h4>
                                                        <p className="text-xs text-purple-400">{exp.company[locale]}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>
                                                                    {formatDate(exp.startDate, locale)} - {exp.endDate === 'present' ? expT('present') : formatDate(exp.endDate, locale)}
                                                                </span>
                                                            </div>
                                                            {highlights.length > 0 && (
                                                                <motion.div
                                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <ChevronDown className="w-4 h-4 text-white/40" />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Dropdown Content */}
                                                <AnimatePresence>
                                                    {isExpanded && highlights.length > 0 && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                                                                <p className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                                                                    Achievements
                                                                </p>
                                                                {highlights.map((highlight, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <CheckCircle2 className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                                                                        <span className="text-xs text-white/70">{highlight}</span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
