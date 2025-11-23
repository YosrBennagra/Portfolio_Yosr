'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');
  const d = useTranslations('degree');
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
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

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl" />
              <div className="absolute inset-4 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                <p className="text-slate-600 dark:text-slate-400 text-center px-4">
                  Add your profile photo to
                  <br />
                  <code className="text-xs">/public/images/profile.jpg</code>
                </p>
              </div>
              {/* Uncomment when you have an image
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                className="object-cover rounded-2xl"
              />
              */}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('bio')}
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Currently completing my Bachelor's in Engineering at ESPRIT, Tunisia, I specialize in building 
                scalable full-stack applications with AI integration and DevOps practices. My experience spans 
                React, Angular, Spring Boot, NestJS, and modern deployment pipelines.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm passionate about solving complex problems with clean, maintainable code and staying at the 
                forefront of emerging technologies. Let's build something amazing together!
              </p>
            </div>

            {/* Degree equivalence highlight */}
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50 dark:bg-slate-800/50 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {d('headline')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{d('summary')}</p>
                <button
                  onClick={() => setOpen(o => !o)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {open ? d('toggleLess') : d('toggleMore')}
                </button>
                {open && (
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{d('detailsTitle')}:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.eu')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.fr')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.ca')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.de')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.it')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.es')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.uk')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.us')}</li>
                      <li className="text-slate-600 dark:text-slate-400">{d('regions.gulf')}</li>
                    </ul>
                    {/* Note removed per user request */}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                {t('downloadResume')}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="w-5 h-5" />
                {t('viewResume')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
