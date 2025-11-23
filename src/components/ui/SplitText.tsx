'use client';

import { HTMLAttributes, createElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

type TweenVars = gsap.TweenVars;

const DEFAULT_FROM: TweenVars = { opacity: 0, y: 40 };
const DEFAULT_TO: TweenVars = { opacity: 1, y: 0 };

type HTMLElementTag = keyof HTMLElementTagNameMap;

export type SplitTextProps = {
  text: string;
  tag?: HTMLElementTag;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: TweenVars;
  to?: TweenVars;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  onComplete?: () => void;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export default function SplitText({
  text,
  tag: Tag = 'p',
  className,
  delay = 70,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  threshold = 0.1,
  rootMargin = '-100px',
  once = true,
  onComplete,
  ...rest
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const types = useMemo(() => splitType.split(',').map(type => type.trim()), [splitType]);
  const typesKey = useMemo(() => types.join('|'), [types]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let ctx: gsap.Context | undefined;
    let splitInstance: SplitType | undefined;

    const animate = () => {
      splitInstance = new SplitType(node, { types: splitType as any });
      const targets = getTargets(splitInstance, types);

      if (targets.length === 0) {
        splitInstance?.revert();
        return;
      }

      syncBackgroundStyles(node, targets);

      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          from,
          {
            ...to,
            ease,
            duration,
            stagger: delay / 1000,
            onComplete
          }
        );
      }, node);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && (!once || !hasAnimatedRef.current)) {
            hasAnimatedRef.current = true;
            animate();
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      ctx?.revert();
      splitInstance?.revert();
    };
  }, [text, typesKey, splitType, delay, duration, ease, from, to, threshold, rootMargin, once, onComplete]);

  const setNode = (node: HTMLElement | null) => {
    containerRef.current = node;
  };

  return createElement(
    Tag,
    {
      ref: setNode,
      className,
      ...rest
    },
    text
  );
}

function getTargets(split: SplitType, types: string[]) {
  const seen = new Set<HTMLElement>();
  const collections = types.map(type => {
    if (type === 'words') return split.words ?? [];
    if (type === 'lines') return split.lines ?? [];
    if (type === 'chars') return split.chars ?? [];
    return [] as HTMLElement[];
  });

  const targets: HTMLElement[] = [];

  collections.forEach(collection => {
    collection.forEach(node => {
      if (!seen.has(node)) {
        seen.add(node);
        targets.push(node);
      }
    });
  });

  return targets;
}

function syncBackgroundStyles(source: HTMLElement, targets: HTMLElement[]) {
  const styles = window.getComputedStyle(source);
  const background = styles.getPropertyValue('background-image');
  const clip = styles.getPropertyValue('-webkit-background-clip');
  const clipStd = styles.getPropertyValue('background-clip');

  if (!background || background === 'none') {
    return;
  }

  targets.forEach(target => {
    target.style.backgroundImage = background;
    target.style.backgroundClip = clipStd || 'text';
    target.style.webkitBackgroundClip = clip || 'text';
    target.style.webkitTextFillColor = 'transparent';
    target.style.color = 'transparent';
    target.style.display = 'inline-block';
  });
}
