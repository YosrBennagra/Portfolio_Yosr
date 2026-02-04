'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['home', 'skills', 'projects', 'certificates', 'contact'];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(id => document.getElementById(id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 shadow-lg shadow-slate-900/5 dark:shadow-black/10'
      : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            {/* Animated Logo Mark */}
            <motion.div
              className="relative w-10 h-10 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black text-white">Y</span>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                Yosr Ben Nagra
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-orange-500 dark:text-orange-400" />
                <span className="text-[9px] font-medium text-slate-400 dark:text-white/40 tracking-widest uppercase">
                  Full-Stack Developer
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation - Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-sm"
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item;
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActive
                    ? 'text-white'
                    : 'text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white/80'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-rose-500/90 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{t(item)}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="hidden sm:flex items-center gap-1">
              <ThemeToggle />
              <div className="w-px h-4 bg-transparent" />
              <LanguageSwitch />
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-1">
              <ThemeToggle />
              <LanguageSwitch />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="container mx-auto px-4 py-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item;
                  return (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item)}
                      className={`text-left px-4 py-3 rounded-xl border transition-all ${isActive
                        ? 'bg-gradient-to-r from-orange-100 dark:from-orange-500/20 to-rose-100 dark:to-rose-500/20 border-orange-300 dark:border-orange-500/30 text-slate-800 dark:text-white'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white'
                        }`}
                    >
                      <span className="text-sm font-medium">{t(item)}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-slate-500 dark:text-white/50">Available for new projects</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
