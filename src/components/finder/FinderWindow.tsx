'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun, Globe } from 'lucide-react';
import { useEffect, useState, useMemo, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { locales } from '@/i18n';
import clsx from 'clsx';

const localePrefixPattern = new RegExp(`^/(?:${locales.join('|')})(?=/|$)`);
const stripLocaleFromPath = (path: string) => {
    const stripped = path.replace(localePrefixPattern, '');
    return stripped.length === 0 ? '/' : stripped;
};

interface FinderWindowProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

function MacOSThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = useMemo(() => {
        if (theme === 'system') {
            return resolvedTheme === 'dark';
        }
        return theme === 'dark';
    }, [theme, resolvedTheme]);

    if (!mounted) {
        return <div className="w-7 h-7" />;
    }

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="w-4 h-4 text-amber-500" />
            ) : (
                <Moon className="w-4 h-4 text-slate-500" />
            )}
        </button>
    );
}

function MacOSLanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'fr' : 'en';
        const targetPath = pathname ? stripLocaleFromPath(pathname) : '/';
        startTransition(() => {
            router.replace(targetPath, { locale: newLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-1.5 px-2 h-7 rounded-md hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors text-xs font-medium text-slate-600 dark:text-slate-300"
            aria-label="Toggle language"
        >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{locale}</span>
        </button>
    );
}

export default function FinderWindow({ title = 'Portfolio', children, className }: FinderWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                'flex flex-col w-full h-full max-w-[98vw] max-h-[96vh] mx-auto',
                'bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl',
                'rounded-xl lg:rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50',
                'border border-slate-200/60 dark:border-white/10',
                'overflow-hidden',
                className
            )}
        >
            {/* macOS Window Header Bar */}
            <div className="flex-shrink-0 flex items-center h-12 px-4 bg-gradient-to-b from-slate-100/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-850/90 border-b border-slate-200/60 dark:border-white/10">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-2" aria-hidden="true">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner shadow-red-700/30 ring-1 ring-red-600/20" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner shadow-yellow-700/30 ring-1 ring-yellow-600/20" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA40] shadow-inner shadow-green-700/30 ring-1 ring-green-600/20" />
                </div>

                {/* Window Title */}
                <div className="flex-1 text-center">
                    <h1 className="text-sm font-medium text-slate-600 dark:text-slate-300 truncate">
                        {title}
                    </h1>
                </div>

                {/* Header Actions: Theme + Language */}
                <div className="flex items-center gap-1">
                    <MacOSLanguageToggle />
                    <MacOSThemeToggle />
                </div>
            </div>

            {/* Window Content */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
}
