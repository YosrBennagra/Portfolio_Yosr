'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';
import ShinyText from '@/components/ui/text/ShinyText';
import ShuffleText from '@/components/ui/text/ShuffleText';
import ScrollFloatText from '@/components/ui/text/ScrollFloatText';
import RotatingText from '@/components/ui/text/RotatingText';
import GlitchText from '@/components/ui/text/GlitchText';
import LightRays from '@/components/ui/reactbits/LightRays';
import TargetCursor from '@/components/ui/reactbits/TargetCursor';
import Dock from '@/components/ui/reactbits/Dock';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  const t = useTranslations('hero');
  const rotatingWords = [
    t('rotating.aiDevops'),
    t('rotating.software'),
    t('rotating.javascript'),
    t('rotating.fullstack')
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-[85vh] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <LightRays />
      <TargetCursor className="hidden md:block" />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-1">
            <ShinyText
              text={t('greeting')}
              className="text-xs uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300"
              gradient="linear-gradient(120deg, #38bdf8 0%, #a855f7 50%, #fb7185 100%)"
              duration={4}
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-2">
            <SplitText
              tag="h1"
              text="Yosr Ben Nagra"
              splitType="chars"
              delay={60}
              duration={1.1}
              ease="elastic.out(1, 0.5)"
              className="split-text-gradient text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-2">
            <RotatingText
              words={rotatingWords}
              className="text-xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-4">
            <ShuffleText
              text={t('highlight')}
              className="text-sm md:text-lg text-blue-600 dark:text-blue-300"
            />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            <ScrollFloatText
              text={t('description')}
              className="text-center"
            />
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-6">
            <GlitchText
              text={t('glitch')}
              className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500"
              intensity="bold"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="min-w-[180px] glow-effect"
            >
              {t('cta.viewProjects')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="min-w-[180px] gradient-border"
            >
              {t('cta.contact')}
            </Button>
          </motion.div>

          <Dock
            className="mt-6"
            items={[
              { label: 'Work', icon: '💼', onClick: () => scrollToSection('projects') },
              { label: 'Focus', icon: '🧠', onClick: () => scrollToSection('focus') },
              { label: 'Skills', icon: '⚙️', onClick: () => scrollToSection('skills') },
              { label: 'Contact', icon: '✉️', onClick: () => scrollToSection('contact') }
            ]}
          />

          <motion.div
            variants={fadeInUp}
            className="mt-8"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-5 h-5 mx-auto" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
