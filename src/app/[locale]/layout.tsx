import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Yosr Ben Nagra | Full Stack Engineer',
  description: 'Full Stack Engineer specializing in React, Angular, Spring Boot, NestJS, and AI integration. Based in Tunisia, graduating June 2025.',
  keywords: ['full stack engineer', 'web developer', 'React', 'Angular', 'Spring Boot', 'NestJS', 'DevOps', 'AI integration', 'Tunisia'],
  authors: [{ name: 'Yosr Ben Nagra' }],
  openGraph: {
    title: 'Yosr Ben Nagra | Full Stack Engineer',
    description: 'Full Stack Engineer specializing in React, Angular, Spring Boot, NestJS, and AI integration',
    type: 'website',
  },
};

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
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
