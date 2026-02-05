'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Send,
    Mail,
    Phone,
    MessageCircle,
    Github,
    Linkedin,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    Coffee,
    Rocket,
    Music,
    Copy,
    Check,
    ExternalLink
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import clsx from 'clsx';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactForm = z.infer<typeof contactSchema>;

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'yosrbennagra@gmail.com',
        action: 'copy',
        color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+216 53 916 040',
        action: 'copy',
        color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
        icon: MessageCircle,
        label: 'WhatsApp',
        value: 'Chat on WhatsApp',
        href: 'https://wa.me/21653916040',
        color: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/yosr-ben-nagra/',
        color: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'Follow on GitHub',
        href: 'https://github.com/YosrBennagra',
        color: 'bg-gradient-to-br from-slate-600 to-slate-800'
    }
];

export default function ContactContent() {
    const t = useTranslations('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactForm) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

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
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedValue(value);
            setTimeout(() => setCopiedValue(null), 2000);
        } catch {
            console.error('Failed to copy');
        }
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-3">
                <div className="grid grid-cols-12 gap-3 h-full">

                    {/* Left column - Contact methods */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
                        {/* Status bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        >
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Available</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span className="text-[10px] text-slate-600 dark:text-slate-300">Tunis</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-[10px] text-slate-600 dark:text-slate-300">24h response</span>
                            </div>
                        </motion.div>

                        {/* Contact cards - Finder style list */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="flex-1 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden"
                        >
                            <div className="px-3 py-2 bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5">
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Contact Methods</span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-white/5">
                                {contactMethods.map((method, index) => {
                                    const Icon = method.icon;
                                    const isCopied = copiedValue === method.value;
                                    const isLink = !!method.href;

                                    return (
                                        <motion.button
                                            key={method.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + index * 0.03 }}
                                            onClick={() => {
                                                if (method.action === 'copy') {
                                                    copyToClipboard(method.value);
                                                } else if (method.href) {
                                                    window.open(method.href, '_blank');
                                                }
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
                                        >
                                            <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm', method.color)}>
                                                <Icon className="w-4.5 h-4.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{method.label}</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{method.value}</p>
                                            </div>
                                            {method.action === 'copy' ? (
                                                <div className={clsx(
                                                    'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
                                                    isCopied ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-slate-100 dark:bg-white/5'
                                                )}>
                                                    {isCopied ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                                                    )}
                                                </div>
                                            ) : (
                                                <ExternalLink className="w-4 h-4 text-slate-400" />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Quick facts */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="flex items-center justify-center gap-4 py-2"
                        >
                            {[
                                { icon: Coffee, text: 'Coffee-powered', color: 'text-amber-500' },
                                { icon: Rocket, text: 'Ships fast', color: 'text-blue-500' },
                                { icon: Music, text: 'Lo-fi beats', color: 'text-pink-500' },
                            ].map((fact) => {
                                const Icon = fact.icon;
                                return (
                                    <div key={fact.text} className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                                        <Icon className={clsx('w-3 h-3', fact.color)} />
                                        <span className="text-[10px]">{fact.text}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right column - Contact form */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="flex-1 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-white">Send a Message</h3>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">I&apos;ll get back to you within 24 hours</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                            Name
                                        </label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            placeholder="Your name"
                                            className={clsx(
                                                'w-full px-3 py-2 rounded-lg text-sm',
                                                'bg-slate-50 dark:bg-slate-800/50',
                                                'border border-slate-200 dark:border-white/10',
                                                'text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500',
                                                'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                                                'transition-all duration-200',
                                                errors.name && 'border-red-400'
                                            )}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-[10px] text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                            Email
                                        </label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="your@email.com"
                                            className={clsx(
                                                'w-full px-3 py-2 rounded-lg text-sm',
                                                'bg-slate-50 dark:bg-slate-800/50',
                                                'border border-slate-200 dark:border-white/10',
                                                'text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500',
                                                'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                                                'transition-all duration-200',
                                                errors.email && 'border-red-400'
                                            )}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-[10px] text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Message
                                    </label>
                                    <textarea
                                        {...register('message')}
                                        rows={4}
                                        placeholder="How can I help you?"
                                        className={clsx(
                                            'w-full px-3 py-2 rounded-lg text-sm resize-none',
                                            'bg-slate-50 dark:bg-slate-800/50',
                                            'border border-slate-200 dark:border-white/10',
                                            'text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500',
                                            'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                                            'transition-all duration-200',
                                            errors.message && 'border-red-400'
                                        )}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-[10px] text-red-500">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={clsx(
                                        'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
                                        'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm',
                                        'shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30',
                                        'transition-all duration-200',
                                        'disabled:opacity-60 disabled:cursor-not-allowed'
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-500/10"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600 dark:text-green-400">Message sent successfully!</span>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-500/10"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                        <span className="text-xs text-red-600 dark:text-red-400">Failed to send message</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
