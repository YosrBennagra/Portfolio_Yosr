'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ReportViewerProps = {
  fileUrl: string;
};

export default function ReportViewer({ fileUrl }: ReportViewerProps) {
  const t = useTranslations('projects');
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-[60vh] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40">
      {hasError ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-sm text-slate-600 dark:text-slate-300">
          <p>{t('reportLoadError')}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('openPdf')}</p>
        </div>
      ) : (
        <iframe
          src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="h-full w-full"
          title="Project report preview"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
