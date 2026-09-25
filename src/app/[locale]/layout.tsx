import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const META = {
  en: {
    title: 'Yosr Ben Nagra | Senior Java & Angular Full Stack Developer',
    description:
      'Senior Java & Angular Full Stack Developer in Tunis. 6 years at WICO Technology building a production ERP with Spring Boot, Angular and PostgreSQL.',
  },
  fr: {
    title: 'Yosr Ben Nagra | Développeur Full Stack Senior Java & Angular',
    description:
      'Développeur Full Stack Senior Java & Angular à Tunis. 6 ans chez WICO Technology sur un ERP de production avec Spring Boot, Angular et PostgreSQL.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === 'fr' ? META.fr : META.en;

  return {
    title: copy.title,
    description: copy.description,
    keywords: [
      'Senior Java Angular Full Stack Developer',
      'Java',
      'Spring Boot',
      'Angular',
      'PostgreSQL',
      'WICO Technology',
      'Tunis',
    ],
    authors: [{ name: 'Yosr Ben Nagra' }],
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: 'website',
      locale: locale === 'fr' ? 'fr_TN' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title: copy.title,
      description: copy.description,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
