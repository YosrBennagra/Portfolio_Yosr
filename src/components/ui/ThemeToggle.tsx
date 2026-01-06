'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');

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
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      aria-label={t('toggle')}
      aria-pressed={isDark}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
