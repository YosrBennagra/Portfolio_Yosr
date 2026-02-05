'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

interface ItemCardProps {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    icon?: LucideIcon | IconType;
    iconColor?: string;
    isSelected?: boolean;
    onClick?: () => void;
    variant?: 'card' | 'list' | 'icon';
    badge?: string;
    badgeColor?: string;
}

export default function ItemCard({
    id,
    title,
    subtitle,
    image,
    icon: Icon,
    iconColor = 'text-slate-500',
    isSelected = false,
    onClick,
    variant = 'card',
    badge,
    badgeColor = 'bg-blue-500',
}: ItemCardProps) {
    if (variant === 'icon') {
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={clsx(
                    'flex flex-col items-center gap-2 p-3 rounded-xl',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isSelected
                        ? 'bg-blue-500/10 dark:bg-blue-500/20 ring-1 ring-blue-500/30'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5'
                )}
            >
                {image ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-sm">
                        <Image
                            src={image}
                            alt={title}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : Icon ? (
                    <div className={clsx(
                        'w-14 h-14 rounded-xl flex items-center justify-center',
                        'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800',
                        'shadow-sm'
                    )}>
                        <Icon className={clsx('w-7 h-7', iconColor)} />
                    </div>
                ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 shadow-sm" />
                )}
                <span className={clsx(
                    'text-xs font-medium text-center line-clamp-2 max-w-[80px]',
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                )}>
                    {title}
                </span>
            </motion.button>
        );
    }

    if (variant === 'list') {
        return (
            <motion.button
                whileHover={{ x: 2 }}
                onClick={onClick}
                className={clsx(
                    'w-full flex items-center gap-3 p-3 rounded-lg',
                    'text-left transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isSelected
                        ? 'bg-blue-500/10 dark:bg-blue-500/20 ring-1 ring-blue-500/30'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5'
                )}
            >
                {image ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                        <Image
                            src={image}
                            alt={title}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : Icon ? (
                    <div className={clsx(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800'
                    )}>
                        <Icon className={clsx('w-5 h-5', iconColor)} />
                    </div>
                ) : null}
                <div className="flex-1 min-w-0">
                    <p className={clsx(
                        'text-sm font-medium truncate',
                        isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'
                    )}>
                        {title}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
                {badge && (
                    <span className={clsx(
                        'px-2 py-0.5 text-[10px] font-medium rounded-full text-white',
                        badgeColor
                    )}>
                        {badge}
                    </span>
                )}
            </motion.button>
        );
    }

    // Card variant (default)
    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={clsx(
                'flex flex-col rounded-xl overflow-hidden',
                'bg-white dark:bg-slate-800/50',
                'border transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                'text-left',
                isSelected
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md'
            )}
        >
            {image && (
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {badge && (
                        <span className={clsx(
                            'absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold rounded-full text-white',
                            badgeColor
                        )}>
                            {badge}
                        </span>
                    )}
                </div>
            )}
            <div className="p-3">
                <p className={clsx(
                    'text-sm font-medium',
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'
                )}>
                    {title}
                </p>
                {subtitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.button>
    );
}
