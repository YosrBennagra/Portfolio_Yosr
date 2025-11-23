'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslations } from 'next-intl';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const pdfWorkerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

type ReportViewerProps = {
  fileUrl: string;
};

export default function ReportViewer({ fileUrl }: ReportViewerProps) {
  const t = useTranslations('projects');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[60vh] overflow-y-auto pr-2">
      {status === 'error' ? (
        <div className="flex h-full items-center justify-center text-center text-sm text-slate-600 dark:text-slate-300">
          {t('reportLoadError')}
        </div>
      ) : (
        <Document
          file={fileUrl}
          loading={
            <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              {t('reportLoading')}
            </div>
          }
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setStatus('ready');
          }}
          onLoadError={() => {
            setStatus('error');
          }}
          className="space-y-6"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="flex justify-center">
              <Page
                pageNumber={index + 1}
                width={Math.max(320, Math.min(containerWidth - 16, 900))}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      )}
    </div>
  );
}
