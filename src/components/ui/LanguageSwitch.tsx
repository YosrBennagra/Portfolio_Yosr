'use client';

import { useTransition, useId, useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' }
];

const localePrefixPattern = new RegExp(`^/(?:${locales.join('|')})(?=/|$)`);

const stripLocaleFromPath = (path: string) => {
  const stripped = path.replace(localePrefixPattern, '');
  return stripped.length === 0 ? '/' : stripped;
};

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');
  const labelId = useId();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    setSelectedLocale(newLocale);
    const targetPath = pathname ? stripLocaleFromPath(pathname) : '/';

    startTransition(() => {
      router.replace(targetPath, { locale: newLocale });
    });
  };

  return (
    <div role="group" aria-labelledby={labelId} className="relative">
      <span id={labelId} className="sr-only">
        {t('select')}
      </span>
      <div className="flex items-center gap-0.5 rounded-lg border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/80 p-0.5 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:from-slate-800/90 dark:to-slate-900/90">
        {languages.map((lang) => {
          const isActive = selectedLocale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChange(lang.code)}
              disabled={isPending || isActive}
              aria-pressed={isActive}
              aria-label={lang.name}
              className={cn(
                'relative flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400',
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-400/20'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-100'
              )}
            >
              <span aria-hidden className="text-lg leading-none">
                {lang.flag}
              </span>
              <span className="tracking-wide">{lang.label}</span>
              {isActive && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-400 ring-2 ring-white dark:ring-slate-800" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
