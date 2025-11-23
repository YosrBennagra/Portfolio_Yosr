import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&*+-';

type ShuffleTextProps = {
  text: string;
  duration?: number;
  stepTime?: number;
  className?: string;
  charset?: string;
};

export default function ShuffleText({
  text,
  duration = 1000,
  stepTime = 30,
  className,
  charset = DEFAULT_CHARSET
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  const characters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(1, Math.floor(duration / stepTime));

    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * characters.length);

      const next = characters
        .map((char, index) => {
          if (index < revealed || char === ' ') {
            return char;
          }
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join('');

      setDisplayText(next);

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [text, characters, duration, stepTime, charset]);

  return <span className={clsx('inline-flex', className)}>{displayText}</span>;
}
