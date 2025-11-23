'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Award, ExternalLink, Download, X } from 'lucide-react';
import TiltedCard from '@/components/ui/reactbits/TiltedCard';
import ChromaGrid from '@/components/ui/reactbits/ChromaGrid';
import Button from '@/components/ui/Button';
import { certificates } from '@/data/certificates';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

export default function Certificates() {
  const t = useTranslations('certificates');
  const locale = useLocale();
  const currentLocale = (['en', 'fr'] as const).includes(locale as any) ? (locale as 'en' | 'fr') : 'en';
  const [activePreview, setActivePreview] = useState<{
    src: string;
    type: 'pdf' | 'image';
    title: string;
  } | null>(null);

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePreview = (params: { src: string; type?: 'pdf' | 'image'; title: string }) => {
    setActivePreview({
      src: params.src,
      type: params.type ?? 'image',
      title: params.title
    });
  };

  const closePreview = () => setActivePreview(null);

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
            const previewSrc = certificate.preview ? encodeURI(certificate.preview) : null;
            return (
              <motion.div key={certificate.id} variants={fadeInUp} custom={index}>
                <TiltedCard className="h-full">
                  <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col">
                    <div
                      className={`relative h-64 sm:h-72 overflow-hidden ${previewSrc ? 'cursor-zoom-in' : ''}`}
                      onClick={() => previewSrc && handlePreview({ src: previewSrc, type: certificate.previewType, title: certificate.title[currentLocale] })}
                      aria-label={previewSrc ? t('previewAction') : undefined}
                    >
                      {previewSrc ? (
                        certificate.previewType === 'pdf' ? (
                          <iframe
                            src={previewSrc}
                            title={`${certificate.title[currentLocale]} preview`}
                            className="h-full w-full"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={previewSrc}
                            alt={`${certificate.title[currentLocale]} preview`}
                            fill
                            sizes="(min-width: 1024px) 30vw, 100vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                        )
                      ) : (
                        <ChromaGrid className="opacity-70" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/5" />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between text-white/80 text-xs uppercase tracking-[0.3em]">
                          <span>{certificate.badge}</span>
                          <span>{certificate.tags?.[0]}</span>
                        </div>
                        <div className="space-y-1">
                          <Award className="w-8 h-8 text-white" />
                          <p className="text-sm text-white/80">{certificate.issuer[currentLocale]}</p>
                          <p className="text-lg font-semibold text-white">{certificate.title[currentLocale]}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-4">
                      {previewSrc && (
                        <button
                          type="button"
                          onClick={() => handlePreview({ src: previewSrc, type: certificate.previewType, title: certificate.title[currentLocale] })}
                          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white transition hover:border-white/60 hover:bg-white/20"
                        >
                          {t('previewAction')}
                        </button>
                      )}
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

      {activePreview && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closePreview}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label={t('closePreview')}
            >
              <X className="h-5 w-5" />
            </button>
            {activePreview.type === 'pdf' ? (
              <iframe
                src={activePreview.src}
                title={`${activePreview.title} preview`}
                className="h-[80vh] w-full"
                loading="lazy"
              />
            ) : (
              <div className="relative h-[80vh] w-full">
                <Image
                  src={activePreview.src}
                  alt={`${activePreview.title} preview`}
                  fill
                  sizes="100vw"
                  className="object-contain bg-slate-900"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
