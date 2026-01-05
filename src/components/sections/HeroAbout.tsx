'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Layers, Cpu, ServerCog, MapPin, Globe, Calendar, Code2 } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { fadeInUp, fadeInRight, staggerContainer } from '@/lib/animations';
import clsx from 'clsx';

const highlightCards = [
    { key: 'experience', icon: Sparkles, color: 'from-blue-500 to-cyan-400' },
    { key: 'stack', icon: Layers, color: 'from-purple-500 to-pink-400' },
    { key: 'ai', icon: Cpu, color: 'from-emerald-500 to-teal-400' },
    { key: 'delivery', icon: ServerCog, color: 'from-orange-500 to-amber-400' },
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
            {/* Static Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                {/* Subtle static orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[180px]" />

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
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
                        {/* Status Badge */}
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-emerald-400/90 uppercase tracking-wider">
                                {t('greeting')}
                            </span>
                        </motion.div>

                        {/* Name - Clean Typography */}
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="block text-white">Yosr</span>
                                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
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
                                        i === 0 && 'bg-blue-500/10 border-blue-500/30 text-blue-300',
                                        i === 1 && 'bg-purple-500/10 border-purple-500/30 text-purple-300',
                                        i === 2 && 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                    )}
                                >
                                    {role}
                                </span>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-white/60 max-w-lg leading-relaxed"
                        >
                            {t('description')}
                        </motion.p>

                        {/* Code Snippet Style */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/5 max-w-md"
                        >
                            <Code2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <code className="text-sm font-mono">
                                <span className="text-purple-400">const</span>{' '}
                                <span className="text-blue-300">developer</span>{' '}
                                <span className="text-white/50">=</span>{' '}
                                <span className="text-emerald-400">"passionate"</span>
                            </code>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection('projects')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0"
                            >
                                {t('cta.viewProjects')}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollToSection('contact')}
                                className="border-white/20 text-white hover:bg-white/10"
                            >
                                {t('cta.contact')}
                            </Button>
                        </motion.div>

                        {/* Quick Facts */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 pt-4">
                            {quickFacts.map((fact) => {
                                const Icon = fact.icon;
                                return (
                                    <div key={fact.key} className="flex items-center gap-2 text-white/50 text-sm">
                                        <Icon className="w-4 h-4 text-blue-400" />
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
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl scale-105" />

                            {/* Main Image Card */}
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm">
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
