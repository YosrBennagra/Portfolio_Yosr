'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContentPaneProps {
    title?: string;
    subtitle?: string;
    itemCount?: number;
    children: ReactNode;
    className?: string;
}

export default function ContentPane({
    title,
    subtitle,
    itemCount,
    children,
    className
}: ContentPaneProps) {
    return (
        <div
            className={clsx(
                'flex-1 flex flex-col min-w-0',
                'bg-white/60 dark:bg-slate-900/40',
                className
            )}
        >
            {/* Content Header */}
            {(title || subtitle || itemCount !== undefined) && (
                <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200/40 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center justify-between">
                        <div>
                            {title && (
                                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {itemCount !== undefined && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full">
                                {itemCount} items
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                {children}
            </div>
        </div>
    );
}
