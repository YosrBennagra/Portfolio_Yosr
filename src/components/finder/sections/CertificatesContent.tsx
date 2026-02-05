'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Eye, FileText, Download, CheckCircle2, Shield } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { certificates } from '@/data/certificates';
import { formatDate } from '@/lib/utils';
import { DetailItem } from '../DetailsPane';
import { useState } from 'react';

interface CertificatesContentProps {
    onSelectItem?: (item: DetailItem | null) => void;
    selectedId?: string | null;
}

// Large certificate preview component showing actual PDF/document
function DocumentPreview({ cert, locale }: { cert: typeof certificates[0]; locale: 'en' | 'fr' }) {
    const isPdf = cert.previewType === 'pdf';

    // For PDFs, show embedded preview
    if (isPdf && cert.preview) {
        return (
            <div className="relative h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-2">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-inner border border-slate-200 dark:border-white/10">
                    <iframe
                        src={`${cert.preview}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full pointer-events-none"
                        title={cert.title[locale]}
                    />
                    {/* Overlay to prevent interaction but allow visibility */}
                    <div className="absolute inset-0 pointer-events-none" />
                </div>
            </div>
        );
    }

    // For images, show directly
    if (cert.preview) {
        return (
            <div className="relative h-full">
                <Image
                    src={cert.preview}
                    alt={cert.title[locale]}
                    fill
                    className="object-contain"
                />
            </div>
        );
    }

    // Fallback icon
    return (
        <div className="relative h-full flex items-center justify-center">
            <Award className="w-16 h-16 text-amber-500 dark:text-amber-400" />
        </div>
    );
}

export default function CertificatesContent({ onSelectItem, selectedId }: CertificatesContentProps) {
    const t = useTranslations('certificates');
    const locale = useLocale() as 'en' | 'fr';
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleSelect = (cert: typeof certificates[0]) => {
        const links = [];
        if (cert.credentialUrl) links.push({ label: 'View Credential', url: cert.credentialUrl });
        if (cert.asset) links.push({ label: 'Download Certificate', url: cert.asset });

        const item: DetailItem = {
            id: cert.id,
            title: cert.title[locale],
            subtitle: cert.issuer[locale],
            description: cert.description[locale],
            image: cert.preview && cert.previewType === 'image' ? cert.preview : undefined,
            date: cert.issueDate ? formatDate(cert.issueDate, locale) : undefined,
            tags: cert.tags || [],
            links,
            metadata: [
                { label: 'Issuer', value: cert.issuer[locale] },
                ...(cert.badge ? [{ label: 'Badge', value: cert.badge }] : []),
            ],
            type: 'certificate',
        };
        onSelectItem?.(item);
    };

    // Badge colors
    const badgeColors: Record<string, string> = {
        'Accredible': 'from-blue-500 to-indigo-500',
        'BCdiploma': 'from-purple-500 to-pink-500',
        'Hashgraph Dev': 'from-emerald-500 to-teal-500',
        'Credly': 'from-orange-500 to-amber-500',
    };

    return (
        <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5 border border-amber-200/50 dark:border-amber-500/20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-white">Verified Credentials</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {certificates.length} certificates • Click to view details
                    </p>
                </div>
            </div>

            {/* Certificates Grid - Single column for larger previews */}
            <div className="grid grid-cols-1 gap-5">
                {certificates.map((cert, index) => {
                    const isSelected = selectedId === cert.id;
                    const isHovered = hoveredId === cert.id;
                    const isPdf = cert.previewType === 'pdf';

                    return (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onMouseEnter={() => setHoveredId(cert.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => handleSelect(cert)}
                            className={clsx(
                                'group relative rounded-xl overflow-hidden cursor-pointer',
                                'bg-white/80 dark:bg-white/5 backdrop-blur-sm',
                                'border-2 transition-all duration-300',
                                isSelected
                                    ? 'border-blue-500 ring-4 ring-blue-500/20 shadow-lg'
                                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md'
                            )}
                        >
                            {/* Preview Area - Much larger for better certificate visibility */}
                            <div className="relative h-80 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50">
                                {cert.preview && !isPdf ? (
                                    <Image
                                        src={cert.preview}
                                        alt={cert.title[locale]}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <DocumentPreview cert={cert} locale={locale} />
                                )}

                                {/* Badge */}
                                {cert.badge && (
                                    <div className="absolute top-2 right-2">
                                        <span className={clsx(
                                            'px-2 py-0.5 rounded-full text-white text-[10px] font-semibold shadow-md',
                                            'bg-gradient-to-r',
                                            badgeColors[cert.badge] || 'from-slate-500 to-slate-600'
                                        )}>
                                            {cert.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Hover Actions Overlay */}
                                <motion.div
                                    initial={false}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-3"
                                >
                                    <div className="flex gap-2">
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-medium transition-colors shadow-md"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Verify
                                            </a>
                                        )}
                                        {cert.asset && (
                                            <a
                                                href={cert.asset}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-md"
                                            >
                                                <Download className="w-3 h-3" />
                                                Open
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="p-3 border-t border-slate-100 dark:border-white/5">
                                <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {cert.title[locale]}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    {cert.issuer[locale]}
                                </p>

                                <div className="flex items-center justify-between">
                                    {cert.issueDate && (
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                            {formatDate(cert.issueDate, locale)}
                                        </p>
                                    )}

                                    {cert.tags && cert.tags.length > 0 && (
                                        <div className="flex gap-1">
                                            {cert.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] text-slate-500 dark:text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
