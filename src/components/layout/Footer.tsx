'use client';

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/data/social';
import { Github, Linkedin, Twitter, Mail, Phone, Facebook, MessageCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  facebook: Facebook,
  whatsapp: MessageCircle
};

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Portfolio
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t('madeWith')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-3">
              Quick Links
            </h4>
            <div className="flex flex-col gap-1.5">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-3">
              Connect
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
          © {currentYear} Portfolio. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
