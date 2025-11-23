'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Award, ExternalLink, Download } from 'lucide-react';
import TiltedCard from '@/components/ui/reactbits/TiltedCard';
import ChromaGrid from '@/components/ui/reactbits/ChromaGrid';
import Button from '@/components/ui/Button';
import { certificates } from '@/data/certificates';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

export default function Certificates() {
  const t = useTranslations('certificates');
  const locale = useLocale();
  const currentLocale = (['en', 'fr', 'ar'] as const).includes(locale as any) ? (locale as 'en' | 'fr' | 'ar') : 'en';

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="certificates" className="py-20 bg-slate-950/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.4em] text-white/60">
            {t('subtitle')}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((certificate, index) => {
            const issued = certificate.issueDate ? formatDate(certificate.issueDate, locale) : undefined;
            return (
              <motion.div key={certificate.id} variants={fadeInUp} custom={index}>
                <TiltedCard className="h-full">
                  <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <ChromaGrid className="opacity-70" />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between text-white/80 text-xs uppercase tracking-[0.3em]">
                          <span>{certificate.badge}</span>
                          <span>{certificate.tags?.[0]}</span>
                        </div>
                        <div className="space-y-1">
                          <Award className="w-8 h-8 text-white" />
                          <p className="text-sm text-white/70">{certificate.issuer[currentLocale]}</p>
                          <p className="text-lg font-semibold text-white">{certificate.title[currentLocale]}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-4">
                      <p className="text-sm text-white/70 leading-relaxed">
                        {certificate.description[currentLocale]}
                      </p>
                      <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {issued ? `${t('issuedOn')} ${issued}` : t('live')}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {certificate.tags?.map(tag => (
                          <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto grid grid-cols-1 gap-3">
                        <Button
                          variant="secondary"
                          className="w-full gap-2"
                          onClick={() => handleOpen(certificate.credentialUrl)}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('actions.view')}
                        </Button>
                        {certificate.asset && (
                          <Button
                            variant="outline"
                            className="w-full gap-2 text-white border-white/30 hover:bg-white/10"
                            onClick={() => handleOpen(certificate.asset!)}
                          >
                            <Download className="w-4 h-4" />
                            {t('actions.download')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
