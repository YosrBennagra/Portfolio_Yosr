import clsx from 'clsx';

export type ShinyTextProps = {
  text: string;
  className?: string;
  gradient?: string;
  duration?: number;
};

export default function ShinyText({
  text,
  className,
  gradient = 'linear-gradient(120deg, #72c6ff 0%, #f68084 50%, #ffc857 100%)',
  duration = 3
}: ShinyTextProps) {
  return (
    <span
      className={clsx('shiny-text inline-flex bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: gradient,
        animationDuration: `${duration}s`
      }}
    >
      {text}
    </span>
  );
}
