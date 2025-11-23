"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import styles from './AdvancedCardNav.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitch from '@/components/ui/LanguageSwitch';

interface LinkItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface CardItem {
  label: string;
  bgColor?: string;
  textColor?: string;
  links?: LinkItem[];
  sectionId?: string; // optional scroll target
}

interface AdvancedCardNavProps {
  logo?: string;
  logoAlt?: string;
  items: CardItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaLabel?: string;
}

export default function AdvancedCardNav({
  logo = '/images/profile.jpg',
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'var(--background)',
  menuColor = 'var(--foreground)',
  buttonBgColor = 'linear-gradient(90deg,#6366f1,#8b5cf6)',
  buttonTextColor = '#fff',
  ctaLabel,
}: AdvancedCardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const t = useTranslations('cardnav');

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(`.${styles.cardNavContent}`) as HTMLElement | null;
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight; // force reflow
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        Object.assign(contentEl.style, prev);
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const scrollTo = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${styles.cardNavContainer} ${className}`}>
      <nav
        ref={navRef}
        className={`${styles.cardNav} ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
        aria-label={t('title')}
      >
        <div className={styles.cardNavTop}>
          <div
            className={`${styles.hamburgerMenu} ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleMenu();
            }}
          >
            <div className={styles.hamburgerLine} />
            <div className={styles.hamburgerLine} />
          </div>
          <div className={styles.logoContainer}>
            <Image src={logo} alt={logoAlt} width={40} height={40} className={styles.logoImg} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
            <button
              type="button"
              className={styles.ctaButton}
              style={{ background: buttonBgColor, color: buttonTextColor }}
            >
              {ctaLabel || 'Hire Me'}
            </button>
          </div>
        </div>
        <div
          className={styles.cardNavContent}
          aria-hidden={!isExpanded}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className={styles.navCard}
              ref={setCardRef(idx)}
              style={{
                background: item.bgColor || 'linear-gradient(145deg,#f1f5f9,#ffffff)',
                color: item.textColor || 'var(--foreground)',
              }}
            >
              <div className={styles.navCardLabel}>{item.label}</div>
              <div className={styles.navCardLinks}>
                {(item.links || []).map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className={styles.navCardLink}
                    href={lnk.href}
                    onClick={(e) => {
                      if (lnk.href.startsWith('#')) {
                        e.preventDefault();
                        scrollTo(lnk.href.substring(1));
                        toggleMenu();
                      }
                    }}
                    aria-label={lnk.ariaLabel || lnk.label}
                  >
                    <GoArrowUpRight className={styles.navCardLinkIcon} aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
