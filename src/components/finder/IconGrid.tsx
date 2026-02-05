'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface IconGridProps {
    children: ReactNode;
    columns?: number;
    className?: string;
}

export default function IconGrid({
    children,
    columns = 4,
    className
}: IconGridProps) {
    return (
        <div
            className={clsx(
                'grid gap-2',
                columns === 3 && 'grid-cols-3',
                columns === 4 && 'grid-cols-4 sm:grid-cols-5 lg:grid-cols-6',
                columns === 5 && 'grid-cols-5 sm:grid-cols-6 lg:grid-cols-7',
                columns === 6 && 'grid-cols-6 sm:grid-cols-7 lg:grid-cols-8',
                className
            )}
        >
            {children}
        </div>
    );
}
