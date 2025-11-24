'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = useMemo(() => {
    if (theme === 'system') {
      return resolvedTheme === 'dark';
    }
    return theme === 'dark';
  }, [theme, resolvedTheme]);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      aria-label={t('toggle')}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
