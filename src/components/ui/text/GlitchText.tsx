import clsx from 'clsx';

export type GlitchTextProps = {
  text: string;
  className?: string;
  intensity?: 'subtle' | 'bold';
};

export default function GlitchText({
  text,
  className,
  intensity = 'subtle'
}: GlitchTextProps) {
  return (
    <span className={clsx('relative glitch-text', className, intensity === 'bold' && 'glitch-text-bold')} data-text={text}>
      {text}
    </span>
  );
}
