'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MessageCircle, Sparkles, Heart, ArrowUp, Github, Linkedin, Facebook, ExternalLink, Coffee, Rocket, BookOpen, Gamepad2, Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '@/components/ui/Button';
import { socialLinks } from '@/data/social';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    phone: Phone,
    mail: Mail,
    facebook: Facebook,
    whatsapp: MessageCircle
};

// Fun facts that show personality
const funFacts = [
    { icon: Coffee, text: "Powered by coffee & curiosity", color: "text-amber-400" },
    { icon: Rocket, text: "Ships code at 2 AM sometimes", color: "text-blue-400" },
    { icon: Gamepad2, text: "Gamer when not coding", color: "text-purple-400" },
    { icon: Music, text: "Codes better with lo-fi beats", color: "text-pink-400" },
];

// Currently learning - shows growth mindset
const currentlyLearning = [
    { name: ".NET WPF", icon: "🖥️" },
    { name: "LLM", icon: "🤖" },
    { name: "Kubernetes", icon: "☸️" },
];

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactFooter() {
    const t = useTranslations('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

    const displayPhoneNumber = '+216 53 916 040';
    const rawPhoneNumber = '+21653916040';
    const whatsappUrl = 'https://wa.me/21653916040';
    const emailAddress = 'yosrbennagra@gmail.com';

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema)
    });

    const openMailFallback = (payload?: ContactForm) => {
        if (typeof window === 'undefined') return;
        const subject = encodeURIComponent(`Portfolio contact from ${payload?.name ?? 'New lead'}`);
        const signature = [payload?.name, payload?.email].filter(Boolean).join(' · ');
        const bodyContent = [payload?.message || 'I would like to get in touch.', signature].filter(Boolean).join('\n\n');
        const body = encodeURIComponent(`Hi Yosr,\n\n${bodyContent}`);
        window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, '_blank');
    };

    const onSubmit = async (data: ContactForm) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
                const payload = await response.json().catch(() => null);
                setErrorMessage(payload?.error ?? t('form.error'));
                openMailFallback(data);
            }
        } catch {
            setSubmitStatus('error');
            setErrorMessage(t('form.error'));
            openMailFallback(data);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = async (value: string, field: 'phone' | 'email') => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            console.error('Failed to copy');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="relative py-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 dark:via-blue-500/50 to-transparent" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-600/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-600/10 rounded-full blur-[150px]" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4"
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">{t('title')}</h2>
                    <p className="text-slate-500 dark:text-white/50 text-sm max-w-lg mx-auto">{t('subtitle')}</p>
                </motion.div>

                {/* Side by Side Layout */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">

                    {/* Left Column - Contact Form */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <div className="p-6 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-xl border border-slate-200 dark:border-white/10">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Send a Message</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <textarea
                                        {...register('message')}
                                        rows={4}
                                        placeholder="Your message..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>

                                {submitStatus === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 text-center text-sm"
                                    >
                                        ✓ Message sent successfully!
                                    </motion.p>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-center text-sm"
                                    >
                                        {errorMessage}
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column - Quick Contact */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4 h-full"
                    >
                        {/* Quick Contact Cards */}
                        <div className="grid grid-cols-2 gap-3 auto-rows-fr h-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => copyToClipboard(emailAddress, 'email')}
                                className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm dark:shadow-none h-full flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Email</p>
                                <p className="flex-1 text-sm font-medium text-slate-800 dark:text-white truncate">{emailAddress}</p>
                                <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1">
                                    {copiedField === 'email' ? '✓ Copied!' : 'Click to copy'}
                                </p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => copyToClipboard(rawPhoneNumber, 'phone')}
                                className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none h-full flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Phone</p>
                                <p className="flex-1 text-sm font-medium text-slate-800 dark:text-white">{displayPhoneNumber}</p>
                                <p className="text-[10px] text-green-500 dark:text-green-400 mt-1">
                                    {copiedField === 'phone' ? '✓ Copied!' : 'Click to copy'}
                                </p>
                            </motion.button>

                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none h-full flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-3">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">WhatsApp</p>
                                <p className="flex-1 text-sm font-medium text-slate-800 dark:text-white">Quick Chat</p>
                                <p className="text-[10px] text-green-500 dark:text-green-400 mt-1">Chat now →</p>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href="https://www.linkedin.com/in/yosr-ben-nagra/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none h-full flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3">
                                    <Linkedin className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">LinkedIn</p>
                                <p className="flex-1 text-sm font-medium text-slate-800 dark:text-white">Connect</p>
                                <p className="text-[10px] text-blue-500 dark:text-blue-400 mt-1">View profile →</p>
                            </motion.a>
                        </div>

                        {/* Social links removed as requested */}
                    </motion.div>
                </div>

                {/* Personality & Growth Section - Unique HR Touch */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {/* Currently Learning */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 dark:from-blue-500/5 to-purple-50 dark:to-purple-500/5 border border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Currently Exploring</h4>
                            <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-medium">Growth Mindset</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {currentlyLearning.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all shadow-sm dark:shadow-none"
                                >
                                    <span className="text-base">{tech.icon}</span>
                                    <span className="text-xs font-medium text-slate-700 dark:text-white/80">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fun Facts / Personality */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 dark:from-amber-500/5 to-pink-50 dark:to-pink-500/5 border border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Beyond the Code</h4>
                            <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 font-medium">Fun Facts</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {funFacts.map((fact, index) => {
                                const Icon = fact.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                                    >
                                        <Icon className={`w-4 h-4 ${fact.color} flex-shrink-0`} />
                                        <span className="text-[11px] text-slate-500 dark:text-white/60 leading-tight">{fact.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Footer Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10"
                >
                    {/* Unique Signature Section */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            {/* Decorative line */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/50 dark:via-blue-500/50 to-transparent" />

                            {/* Signature text with handwriting style */}
                            <p
                                className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 dark:from-blue-400 via-purple-500 dark:via-purple-400 to-pink-500 dark:to-pink-400"
                                style={{ fontFamily: "'Brush Script MT', cursive" }}
                            >
                                Yosr Ben Nagra
                            </p>

                            {/* Underline decoration */}
                            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                                <path
                                    d="M2 8 C50 2, 100 12, 150 6 C175 3, 195 8, 198 6"
                                    stroke="url(#signatureGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                                <defs>
                                    <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                                        <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-sm">
                            <span>Built with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span>& modern tech</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 dark:text-white/30 text-xs">
                                © {new Date().getFullYear()} All rights reserved
                            </span>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToTop}
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
