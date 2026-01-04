'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Award, ExternalLink, X } from 'lucide-react';
import TiltedCard from '@/components/ui/reactbits/TiltedCard';
import { certificates } from '@/data/certificates';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

const buildPdfPreviewUrl = (src: string) => {
  const separator = src.includes('#') ? '&' : '#';
  return `${src}${separator}toolbar=0&navpanes=0&scrollbar=0`;
};

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
    <section id="certificates" className="py-10 md:py-12 bg-slate-950/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
        >
          <div>
            <motion.h2
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold text-white"
            >
              {t('title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xs text-white/60">
              {t('subtitle')}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {certificates.map((certificate, index) => {
            const issued = certificate.issueDate ? formatDate(certificate.issueDate, locale) : undefined;
            const previewSrc = certificate.preview ? encodeURI(certificate.preview) : null;
            const displayPreviewSrc =
              previewSrc && certificate.previewType === 'pdf' ? buildPdfPreviewUrl(previewSrc) : previewSrc;
            return (
              <motion.div key={certificate.id} variants={fadeInUp} custom={index}>
                <TiltedCard className="h-full">
                  <div className="relative h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col">
                    {/* Compact Preview */}
                    <div
                      className={`relative h-28 sm:h-32 overflow-hidden ${displayPreviewSrc ? 'cursor-zoom-in' : ''}`}
                      onClick={() =>
                        displayPreviewSrc &&
                        handlePreview({ src: displayPreviewSrc, type: certificate.previewType, title: certificate.title[currentLocale] })
                      }
                    >
                      {displayPreviewSrc ? (
                        certificate.previewType === 'pdf' ? (
                          <iframe
                            src={displayPreviewSrc}
                            title={`${certificate.title[currentLocale]} preview`}
                            className="h-full w-full"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={displayPreviewSrc}
                            alt={`${certificate.title[currentLocale]} preview`}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                        )
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white/70 text-[8px] tracking-wider uppercase">
                          Preview soon
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[10px] text-white/80 truncate">{certificate.issuer[currentLocale]}</p>
                        <p className="text-xs font-bold text-white truncate">{certificate.title[currentLocale]}</p>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Award className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>

                    {/* Compact Content */}
                    <div className="p-2 flex-1 flex flex-col gap-1.5">
                      <p className="text-[9px] text-white/60 line-clamp-2 leading-relaxed flex-1">
                        {certificate.description[currentLocale]}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] uppercase tracking-wide text-white/50">
                          {issued || t('live')}
                        </span>
                        {certificate.credentialUrl && (
                          <button
                            onClick={() => handleOpen(certificate.credentialUrl!)}
                            className="text-[8px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
                          >
                            View <ExternalLink className="w-2.5 h-2.5" />
                          </button>
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

      {/* Preview Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closePreview}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-1.5 text-white transition hover:bg-white/20"
              aria-label={t('closePreview')}
            >
              <X className="h-4 w-4" />
            </button>
            {activePreview.type === 'pdf' ? (
              <iframe
                src={activePreview.src}
                title={`${activePreview.title} preview`}
                className="h-[70vh] w-full"
                loading="lazy"
              />
            ) : (
              <div className="relative h-[70vh] w-full">
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
