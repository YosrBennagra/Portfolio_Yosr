'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Briefcase, X, Calendar, Zap } from 'lucide-react';

export default function FloatingHireButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero section
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownloadCV = () => {
        window.open('/resume/Yosr_Ben_Nagra_Resume.pdf', '_blank');
    };

    const handleScheduleCall = () => {
        // Opens calendar or contact section
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
        setIsExpanded(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-6 right-6 z-40"
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-4 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-900/20 dark:shadow-black/50 min-w-[220px]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                        </div>
                                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Available Now</span>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-white/50 hover:text-slate-600 dark:hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">5+</p>
                                        <p className="text-[9px] text-slate-400 dark:text-white/40 uppercase">Years</p>
                                    </div>
                                    <div className="text-center border-x border-slate-200 dark:border-white/10">
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">15+</p>
                                        <p className="text-[9px] text-slate-400 dark:text-white/40 uppercase">Projects</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">4</p>
                                        <p className="text-[9px] text-slate-400 dark:text-white/40 uppercase">Certs</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    <button
                                        onClick={handleDownloadCV}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download CV
                                    </button>
                                    <button
                                        onClick={handleScheduleCall}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/80 text-sm font-medium transition-all"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Let's Talk
                                    </button>
                                </div>

                                {/* Response Time */}
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-1.5">
                                    <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                                    <span className="text-[10px] text-slate-400 dark:text-white/40">Usually responds within 24h</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="collapsed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => setIsExpanded(true)}
                                className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                            >
                                {/* Pulse ring */}
                                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur transition-opacity" />

                                <Briefcase className="w-4 h-4 relative" />
                                <span className="text-sm relative">Hire Me</span>

                                {/* Availability dot */}
                                <span className="relative flex h-2 w-2 ml-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
