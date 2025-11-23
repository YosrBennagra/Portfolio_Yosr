import { useEffect, useState } from 'react';

export type CountUpTextProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function CountUpText({
  value,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className
}: CountUpTextProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return <span className={className}>{`${prefix}${display}${suffix}`}</span>;
}
