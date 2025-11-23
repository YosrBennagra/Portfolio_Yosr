import { ReactNode } from 'react';
import clsx from 'clsx';

export type SpotlightCardProps = {
  label?: string;
  title: string;
  description: string;
  accent?: string;
  children?: ReactNode;
  className?: string;
};

export default function SpotlightCard({ label, title, description, accent = 'from-blue-500/10 to-purple-600/20', children, className }: SpotlightCardProps) {
  return (
    <div className={clsx('spotlight-card relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br p-6 md:p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.35)]', accent, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
      <div className="relative z-10 space-y-3">
        {label && <p className="text-xs uppercase tracking-[0.4em] text-white/70">{label}</p>}
        <h3 className="text-3xl font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
        {children}
      </div>
    </div>
  );
}
