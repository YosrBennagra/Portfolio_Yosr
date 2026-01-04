'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Phone, Facebook, MessageCircle, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '@/components/ui/Button';
import { socialLinks } from '@/data/social';
import { fadeInUp, staggerContainer } from '@/lib/animations';

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

export default function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
  const displayPhoneNumber = '+216 53 916 040';
  const rawPhoneNumber = '+21653916040';
  const whatsappUrl = 'https://wa.me/21653916040';
  const facebookUrl = 'https://www.facebook.com/Ikerj0/';
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
    const bodyContent = [payload?.message || 'I would like to get in touch.', signature]
      .filter(Boolean)
      .join('\n\n');
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
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(t('form.error'));
      openMailFallback(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (value: string, field: 'phone' | 'email') => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2000);
    } catch (copyError) {
      console.error('Failed to copy contact detail', copyError);
    }
  };

  const handlePhoneCopy = () => copyToClipboard(rawPhoneNumber, 'phone');
  const handleEmailCopy = () => copyToClipboard(emailAddress, 'email');

  return (
    <section id="contact" className="py-10 md:py-12 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
        >
          <div>
            <motion.h2
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xs text-slate-600 dark:text-slate-400"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid gap-4 items-start lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="rounded-xl border border-slate-200/70 dark:border-slate-700 bg-white/95 dark:bg-slate-900/80 p-4 h-full flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col space-y-3">
              <div className="space-y-3 flex-1">
              <motion.div variants={fadeInUp}>
                <label htmlFor="name" className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('form.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-[10px] text-red-600">{errors.name.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label htmlFor="email" className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('form.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-[10px] text-red-600">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label htmlFor="message" className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('form.message')}
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-[10px] text-red-600">{errors.message.message}</p>
                )}
              </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  size="sm"
                  className="w-full gap-1.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('form.sending')}</>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {t('form.send')}
                    </>
                  )}
                </Button>
              </motion.div>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center text-sm"
                >
                  {t('form.success')}
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-center text-sm"
                >
                  {errorMessage || t('form.error')}
                </motion.p>
              )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-3 flex flex-col h-full"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-xl border border-slate-200/70 dark:border-slate-700 bg-white/95 dark:bg-slate-900/80 p-3 flex-1 flex flex-col"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {t('socials')}
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{t('direct.subtitle')}</span>
              </div>
              <div className="grid gap-1.5 grid-cols-2 flex-1">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 px-2 py-1.5 text-xs text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:border-white/10 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:bg-white/5"
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        {Icon && <Icon className="w-3 h-3" />}
                        {social.name}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-4 rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700 p-4 text-white shadow-lg"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] items-center">
            <div className="max-w-lg">
              <p className="text-[9px] uppercase tracking-wider text-white/70">{t('direct.title')}</p>
              <h3 className="mt-0.5 text-sm md:text-base font-semibold leading-tight">{t('direct.subtitle')}</h3>
            </div>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <button
                type="button"
                onClick={handleEmailCopy}
                className="group flex flex-col gap-1 rounded-lg border border-white/15 bg-white/5 p-2 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-white/15 p-1"><Mail className="h-3 w-3" /></span>
                  <p className="text-[9px] uppercase tracking-wide text-white/60">{t('direct.email')}</p>
                </div>
                <p className="text-[10px] font-medium truncate">{emailAddress}</p>
                <span className="text-[8px] text-white/50">
                  {copiedField === 'email' ? '✓ Copied!' : 'Click to copy'}
                </span>
              </button>
              <button
                type="button"
                onClick={handlePhoneCopy}
                className="flex flex-col gap-1 rounded-lg border border-white/15 bg-white/5 p-2 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-white/15 p-1"><Phone className="h-3 w-3" /></span>
                  <p className="text-[9px] uppercase tracking-wide text-white/60">{t('direct.phone')}</p>
                </div>
                <p className="text-[10px] font-medium truncate">{displayPhoneNumber}</p>
                <span className="text-[8px] text-white/50">
                  {copiedField === 'phone' ? '✓ Copied!' : 'Click to copy'}
                </span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 rounded-lg border border-white/15 bg-white/5 p-2 transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-white/15 p-1"><MessageCircle className="h-3 w-3" /></span>
                  <p className="text-[9px] uppercase tracking-wide text-white/60">{t('direct.whatsapp')}</p>
                </div>
                <p className="text-[10px] font-medium truncate">{displayPhoneNumber}</p>
                <span className="text-[8px] text-white/50">Chat now</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 rounded-lg border border-white/15 bg-white/5 p-2 transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-white/15 p-1"><Facebook className="h-3 w-3" /></span>
                  <p className="text-[9px] uppercase tracking-wide text-white/60">{t('direct.facebook')}</p>
                </div>
                <p className="text-[10px] font-medium truncate">Ikerj0</p>
                <span className="text-[8px] text-white/50">Message me</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
