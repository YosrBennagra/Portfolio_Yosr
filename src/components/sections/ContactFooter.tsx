'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MessageCircle, Sparkles, Heart, ArrowUp, Github, Linkedin, Facebook, ExternalLink } from 'lucide-react';
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
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />

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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('title')}</h2>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">{t('subtitle')}</p>
                </motion.div>

                {/* Side by Side Layout */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Left Column - Contact Form */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Send a Message</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <textarea
                                        {...register('message')}
                                        rows={4}
                                        placeholder="Your message..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
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
                        className="space-y-4"
                    >
                        {/* Quick Contact Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => copyToClipboard(emailAddress, 'email')}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-white/50 mb-1">Email</p>
                                <p className="text-sm font-medium text-white truncate">{emailAddress}</p>
                                <p className="text-[10px] text-blue-400 mt-1">
                                    {copiedField === 'email' ? '✓ Copied!' : 'Click to copy'}
                                </p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => copyToClipboard(rawPhoneNumber, 'phone')}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-white/50 mb-1">Phone</p>
                                <p className="text-sm font-medium text-white">{displayPhoneNumber}</p>
                                <p className="text-[10px] text-green-400 mt-1">
                                    {copiedField === 'phone' ? '✓ Copied!' : 'Click to copy'}
                                </p>
                            </motion.button>

                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-3">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-white/50 mb-1">WhatsApp</p>
                                <p className="text-sm font-medium text-white">Quick Chat</p>
                                <p className="text-[10px] text-green-400 mt-1">Chat now →</p>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href="https://www.linkedin.com/in/yosrbennagra/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3">
                                    <Linkedin className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs text-white/50 mb-1">LinkedIn</p>
                                <p className="text-sm font-medium text-white">Connect</p>
                                <p className="text-[10px] text-blue-400 mt-1">View profile →</p>
                            </motion.a>
                        </div>

                        {/* Social Links Row */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/50 mb-3">More ways to connect</p>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => {
                                    const Icon = iconMap[social.icon];
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all text-xs"
                                        >
                                            {Icon && <Icon className="w-3.5 h-3.5" />}
                                            {social.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <span>Built with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span>by Yosr Ben Nagra</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-white/30 text-xs">
                                © {new Date().getFullYear()} All rights reserved
                            </span>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToTop}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
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
