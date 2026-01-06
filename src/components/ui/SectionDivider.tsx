'use client';

interface SectionDividerProps {
    readonly variant?: 'wave' | 'diagonal' | 'dots' | 'gradient';
    readonly flip?: boolean;
    readonly className?: string;
}

export default function SectionDivider({ variant = 'gradient', flip = false, className = '' }: SectionDividerProps) {
    if (variant === 'wave') {
        return (
            <div className={`relative w-full h-16 overflow-hidden ${flip ? 'transform rotate-180' : ''} ${className}`}>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <path
                        d="M0,0 C300,80 600,0 900,60 C1050,90 1150,40 1200,60 L1200,120 L0,120 Z"
                        className="fill-slate-900/50"
                    />
                    <path
                        d="M0,20 C200,100 500,20 800,80 C1000,120 1100,60 1200,80 L1200,120 L0,120 Z"
                        className="fill-slate-950/80"
                    />
                </svg>
            </div>
        );
    }

    if (variant === 'diagonal') {
        return (
            <div className={`relative w-full h-20 ${className}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 ${flip ? 'skew-y-1' : '-skew-y-1'}`} />
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-20">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    <div className="w-3 h-3 rotate-45 border border-blue-500/50" />
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className={`relative w-full py-8 flex items-center justify-center ${className}`}>
                <div className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                    <div className="w-3 h-3 rotate-45 border border-white/20 bg-slate-900" />
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-purple-400/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                </div>
            </div>
        );
    }

    // Default gradient variant
    return (
        <div className={`relative w-full h-px ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-white/20 bg-slate-950" />
        </div>
    );
}
