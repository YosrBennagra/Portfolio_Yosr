import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export type RotatingTextProps = {
  words: string[];
  interval?: number;
  className?: string;
};

export default function RotatingText({
  words,
  interval = 2500,
  className
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
