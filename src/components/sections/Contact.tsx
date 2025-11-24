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
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid gap-12 items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-8 h-full flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col space-y-6">
              <div className="space-y-6 flex-1">
              <motion.div variants={fadeInUp}>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('form.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('form.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>{t('form.sending')}</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.send')}
                    </>
                  )}
                </Button>
              </motion.div>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center"
                >
                  {t('form.success')}
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-center"
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
            className="space-y-8 flex flex-col h-full"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg dark:border-white/5 dark:bg-slate-900/70 flex-1 flex flex-col"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {t('socials')}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('direct.subtitle')}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 flex-1">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-slate-200/70 px-4 py-3 text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:border-white/10 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:bg-white/5"
                    >
                      <span className="flex items-center gap-3 font-medium">
                        {Icon && <Icon className="w-5 h-5" />}
                        {social.name}
                      </span>
                      <ExternalLink className="w-4 h-4 opacity-60" />
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
          className="mt-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700 p-8 text-white shadow-2xl"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">{t('direct.title')}</p>
              <h3 className="mt-2 text-3xl font-semibold leading-tight">{t('direct.subtitle')}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={handleEmailCopy}
                className="group flex h-full min-h-[150px] flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/15 p-2"><Mail className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">{t('direct.email')}</p>
                    <p className="text-lg font-semibold">{emailAddress}</p>
                  </div>
                </div>
                <span className="mt-4 text-xs text-white/70" aria-live="polite">
                  {copiedField === 'email' ? t('direct.emailCopied') : t('direct.emailHelp')}
                </span>
              </button>
              <button
                type="button"
                onClick={handlePhoneCopy}
                className="flex h-full min-h-[150px] flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/15 p-2"><Phone className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">{t('direct.phone')}</p>
                    <p className="text-lg font-semibold">{displayPhoneNumber}</p>
                  </div>
                </div>
                <span className="mt-4 text-xs text-white/70" aria-live="polite">
                  {copiedField === 'phone' ? t('direct.phoneCopied') : t('direct.phoneCopyHint')}
                </span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-[150px] flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/15 p-2"><MessageCircle className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">{t('direct.whatsapp')}</p>
                    <p className="text-lg font-semibold">{displayPhoneNumber}</p>
                  </div>
                </div>
                <span className="mt-4 text-xs text-white/70">{t('direct.whatsappHint')}</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-[150px] flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/15 p-2"><Facebook className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">{t('direct.facebook')}</p>
                    <p className="text-lg font-semibold">facebook.com/Ikerj0</p>
                  </div>
                </div>
                <span className="mt-4 text-xs text-white/70">{t('direct.facebookHint')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
