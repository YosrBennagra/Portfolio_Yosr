'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/reactbits/SpotlightCard';

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
              <Image
                src="/images/YosrBenNagra_Picture_2.jpg"
                alt="Yosr Ben Nagra alternate"
                fill
                priority
                className="object-cover rounded-2xl"
                style={{ objectPosition: '30% 50%' }}
              />
              {/* Secondary image thumbnail */}
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-xl overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-lg">
                <Image
                  src="/images/YosrBenNagra_Picture.jpg"
                  alt="Yosr Ben Nagra portrait"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '60% 10%' }}
                />
              </div>
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
              <SpotlightCard
                label={d('title')}
                title={d('headline')}
                description={d('summary')}
                className="text-left"
              >
                <button
                  onClick={() => setOpen(o => !o)}
                  className="text-sm font-semibold text-white/80 hover:text-white flex items-center gap-1"
                >
                  {open ? d('toggleLess') : d('toggleMore')}
                </button>
                {open && (
                  <div className="mt-4 space-y-1 text-sm text-white/80">
                    <p className="font-medium text-white">{d('detailsTitle')}:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>{d('regions.eu')}</li>
                      <li>{d('regions.fr')}</li>
                      <li>{d('regions.ca')}</li>
                      <li>{d('regions.de')}</li>
                      <li>{d('regions.it')}</li>
                      <li>{d('regions.es')}</li>
                      <li>{d('regions.uk')}</li>
                      <li>{d('regions.us')}</li>
                      <li>{d('regions.gulf')}</li>
                    </ul>
                  </div>
                )}
              </SpotlightCard>
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
