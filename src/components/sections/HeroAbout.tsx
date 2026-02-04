'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Layers, Cpu, ServerCog, MapPin, Globe, Calendar, Code2 } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { fadeInUp, fadeInRight, staggerContainer } from '@/lib/animations';
import clsx from 'clsx';

const highlightCards = [
    { key: 'experience', icon: Sparkles, color: 'from-orange-500 to-amber-400' },
    { key: 'stack', icon: Layers, color: 'from-rose-500 to-pink-400' },
    { key: 'ai', icon: Cpu, color: 'from-emerald-500 to-teal-400' },
    { key: 'delivery', icon: ServerCog, color: 'from-violet-500 to-purple-400' },
];

const quickFacts = [
    { icon: MapPin, key: 'location' },
    { icon: Globe, key: 'languages' },
    { icon: Calendar, key: 'availability' },
];

export default function HeroAbout() {
    const t = useTranslations('hero');
    const aboutT = useTranslations('about');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen overflow-hidden">
            {/* Static Gradient Background - Light/Dark Mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-rose-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Subtle static orbs - Coral Sunset */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400/20 dark:bg-rose-600/10 rounded-full blur-[140px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/10 dark:bg-amber-600/5 rounded-full blur-[180px]" />

                {/* Grid pattern - unique design */}
                <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-40" />

                {/* Geometric decorators */}
                <div className="geo-circle w-32 h-32 top-32 right-20 hidden lg:block" />
                <div className="geo-circle w-20 h-20 bottom-40 left-32 hidden lg:block" />
                <div className="geo-square w-16 h-16 top-1/3 right-1/4 hidden lg:block" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">

                    {/* Left Column - Hero Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Status Badge - Enhanced with glow */}
                        <motion.div variants={fadeInUp} className="inline-flex">
                            <div className="glow-pill dark:glow-pill bg-emerald-50 dark:bg-transparent border-emerald-200 dark:border-emerald-500/30">
                                <span className="status-ring">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                </span>
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300 uppercase tracking-wider">
                                    {t('greeting')}
                                </span>
                            </div>
                        </motion.div>

                        {/* Name - With underline accent */}
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="block text-slate-800 dark:text-white">Yosr</span>
                                <span className="block underline-accent bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 dark:from-orange-400 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Ben Nagra
                                </span>
                            </h1>
                        </motion.div>

                        {/* Role Tags */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                            {['Full-Stack Developer', 'AI Engineer', 'DevOps'].map((role, i) => (
                                <span
                                    key={role}
                                    className={clsx(
                                        'px-3 py-1.5 rounded-full text-sm font-medium border',
                                        i === 0 && 'bg-orange-100 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/30 text-orange-600 dark:text-orange-300',
                                        i === 1 && 'bg-rose-100 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-300',
                                        i === 2 && 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                                    )}
                                >
                                    {role}
                                </span>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-slate-600 dark:text-white/60 max-w-lg leading-relaxed"
                        >
                            {t('description')}
                        </motion.p>

                        {/* Code Snippet Style */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 max-w-md"
                        >
                            <Code2 className="w-5 h-5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                            <code className="text-sm font-mono">
                                <span className="text-rose-600 dark:text-rose-400">const</span>{' '}
                                <span className="text-orange-600 dark:text-orange-300">developer</span>{' '}
                                <span className="text-slate-400 dark:text-white/50">=</span>{' '}
                                <span className="text-emerald-600 dark:text-emerald-400">"passionate"</span>
                            </code>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection('projects')}
                                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 border-0 text-white shadow-lg shadow-orange-500/25"
                            >
                                {t('cta.viewProjects')}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollToSection('contact')}
                                className="border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-orange-50 dark:hover:bg-white/10 hover:border-orange-300 dark:hover:border-orange-500/30"
                            >
                                {t('cta.contact')}
                            </Button>
                        </motion.div>

                        {/* Quick Facts */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 pt-4">
                            {quickFacts.map((fact) => {
                                const Icon = fact.icon;
                                return (
                                    <div key={fact.key} className="flex items-center gap-2 text-slate-500 dark:text-white/50 text-sm">
                                        <Icon className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                                        <span>{aboutT(`facts.${fact.key}`)}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Creative Image Layout */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        className="relative lg:pl-8"
                        id="about"
                    >
                        {/* Main Container */}
                        <div className="relative max-w-lg mx-auto">
                            {/* Background Frame */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 via-rose-500/20 to-pink-500/20 blur-2xl scale-105" />

                            {/* Main Image Card - With gradient border */}
                            <div className="relative gradient-border noise-texture corner-accent">
                                <div className="rounded-3xl overflow-hidden">
                                    {/* Image */}
                                    <div className="relative aspect-[4/5]">
                                        <Image
                                            src="/images/YosrBenNagra_Picture_2.jpg"
                                            alt="Yosr Ben Nagra"
                                            fill
                                            priority
                                            className="object-cover"
                                            style={{ objectPosition: '30% 50%' }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                                        {/* Stats Grid on Image */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="grid grid-cols-2 gap-2">
                                                {highlightCards.map((card) => {
                                                    const Icon = card.icon;
                                                    return (
                                                        <div
                                                            key={card.key}
                                                            className="p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10"
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className={clsx('w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br', card.color)}>
                                                                    <Icon className="w-3 h-3 text-white" />
                                                                </div>
                                                                <span className="text-[10px] uppercase tracking-wider text-white/50">
                                                                    {aboutT(`highlights.${card.key}.label`)}
                                                                </span>
                                                            </div>
                                                            <p className="text-lg font-bold text-white">
                                                                {aboutT(`highlights.${card.key}.value`)}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Image - Clean Circle */}
                            <div className="absolute -top-6 -right-6 hidden lg:block">
                                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl">
                                    <Image
                                        src="/images/YosrBenNagra_Picture.jpg"
                                        alt="Yosr portrait"
                                        fill
                                        className="object-cover"
                                        style={{ objectPosition: '60% 10%' }}
                                    />
                                </div>
                                {/* Status Ring */}
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -left-4 top-1/3 hidden lg:block">
                                <div className="px-3 py-2 rounded-lg bg-slate-900/90 border border-white/10 backdrop-blur-sm shadow-xl">
                                    <code className="text-[11px] text-emerald-400 font-mono">
                                        status: available
                                    </code>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-sm">
                                {['React', 'Python', 'AI'].map((tech) => (
                                    <span key={tech} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <button
                        onClick={() => scrollToSection('skills')}
                        className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
