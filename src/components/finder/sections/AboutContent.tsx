'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Globe, Calendar, Zap, Rocket, Github, Linkedin, Mail, Music, BookOpen, Coffee, Download, FileText, ExternalLink } from 'lucide-react';
import { DiReact, DiNodejs, DiPython, DiDocker, DiMongodb, DiPostgresql, DiGit, DiJava } from 'react-icons/di';
import { SiTypescript, SiNextdotjs, SiDotnet, SiSpringboot, SiNestjs, SiGraphql, SiJenkins, SiAngular } from 'react-icons/si';
import Image from 'next/image';
import clsx from 'clsx';

const techStack = [
    { name: 'React', icon: DiReact, color: 'text-cyan-500' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-slate-800 dark:text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'Angular', icon: SiAngular, color: 'text-red-500' },
    { name: 'Node.js', icon: DiNodejs, color: 'text-green-600' },
    { name: 'Python', icon: DiPython, color: 'text-yellow-500' },
    { name: 'Java', icon: DiJava, color: 'text-red-600' },
    { name: 'Spring Boot', icon: SiSpringboot, color: 'text-green-500' },
    { name: '.NET', icon: SiDotnet, color: 'text-purple-600' },
    { name: 'NestJS', icon: SiNestjs, color: 'text-red-500' },
    { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
    { name: 'Docker', icon: DiDocker, color: 'text-blue-400' },
    { name: 'Git', icon: DiGit, color: 'text-orange-500' },
    { name: 'Jenkins', icon: SiJenkins, color: 'text-red-500' },
    { name: 'MongoDB', icon: DiMongodb, color: 'text-green-500' },
    { name: 'PostgreSQL', icon: DiPostgresql, color: 'text-blue-600' },
];

const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/YosrBennagra' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yosr-ben-nagra/' },
    { icon: Mail, label: 'Email', href: 'mailto:yosrbennagra@gmail.com' },
];

export default function AboutContent() {
    const t = useTranslations('hero');
    const aboutT = useTranslations('about');

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Main content - fills available space */}
            <div className="flex-1 overflow-auto p-3">
                <div className="grid grid-cols-12 gap-3 min-h-full auto-rows-auto lg:grid-rows-[auto_1fr]">

                    {/* Left column - Profile */}
                    <div className="col-span-12 lg:col-span-4 lg:row-span-2 flex flex-col gap-3">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-slate-200 dark:ring-white/10 shadow-lg">
                                        <Image
                                            src="/images/YosrBenNagra_Picture_2.jpg"
                                            alt="Yosr Ben Nagra"
                                            width={80}
                                            height={80}
                                            priority
                                            className="object-cover w-full h-full"
                                            style={{ objectPosition: '30% 50%' }}
                                        />
                                    </div>
                                    {/* Status */}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow border border-slate-100 dark:border-slate-700">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white truncate">Yosr Ben Nagra</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Full-Stack Developer</p>

                                    {/* Role badges */}
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {['Full-Stack', 'AI', 'DevOps'].map((role) => (
                                            <span key={role} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-xs font-medium">{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Quick Facts */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="grid grid-cols-1 gap-2"
                        >
                            {[
                                { icon: MapPin, key: 'location', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                { icon: Globe, key: 'languages', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                                { icon: Calendar, key: 'availability', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            ].map((fact) => {
                                const Icon = fact.icon;
                                return (
                                    <div
                                        key={fact.key}
                                        className="p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3"
                                    >
                                        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', fact.bg)}>
                                            <Icon className={clsx('w-5 h-5', fact.color)} />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                            {aboutT(`facts.${fact.key}`)}
                                        </p>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-3 gap-2"
                        >
                            {[
                                { value: '2+', label: 'Years', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                                { value: '15+', label: 'Projects', icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                                { value: '5+', label: 'Certs', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center"
                                >
                                    <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center mb-1', stat.bg)}>
                                        <stat.icon className={clsx('w-4 h-4', stat.color)} />
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Resume buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex gap-2"
                        >
                            <a
                                href="https://yosrbennagra.me"
                                target="_blank"
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors shadow-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                CV (EN)
                            </a>
                            <a
                                href="https://yosrbennagra.me"
                                target="_blank"
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-white text-sm font-medium transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                CV (FR)
                            </a>
                        </motion.div>

                        {/* Interests */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-2 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                        >
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { icon: Music, label: 'Music', color: 'text-pink-500', bg: 'bg-pink-500/10' },
                                    { icon: Coffee, label: 'Coffee', color: 'text-amber-600', bg: 'bg-amber-500/10' },
                                    { icon: BookOpen, label: 'Learning', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                ].map((interest) => {
                                    const Icon = interest.icon;
                                    return (
                                        <div key={interest.label} className={clsx('flex items-center gap-2 px-3 py-2 rounded-lg', interest.bg)}>
                                            <Icon className={clsx('w-4 h-4', interest.color)} />
                                            <span className="text-xs text-slate-600 dark:text-slate-300">{interest.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column - Bio & Tech */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="p-5 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                        >
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">About</h3>
                            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                {t('description')}
                            </p>
                        </motion.div>

                        {/* Tech Stack - Finder icon grid style */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 p-6 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10"
                        >
                            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">Tech Stack</h3>
                            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {techStack.map((tech, index) => {
                                    const Icon = tech.icon;
                                    return (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 + index * 0.02 }}
                                            className="group flex flex-col items-center gap-2.5 p-7 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow border border-slate-200/50 dark:border-white/10">
                                                <Icon className={clsx('w-10 h-10 group-hover:scale-110 transition-transform', tech.color)} />
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center">{tech.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
