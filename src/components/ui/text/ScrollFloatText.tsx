import { motion } from 'framer-motion';
import clsx from 'clsx';

export type ScrollFloatTextProps = {
  text: string;
  className?: string;
  floatDistance?: number;
  delay?: number;
};

export default function ScrollFloatText({
  text,
  className,
  floatDistance = 8,
  delay = 0
}: ScrollFloatTextProps) {
  return (
    <motion.span
      className={clsx('inline-flex items-center', className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, margin: '-80px' }}
      animate={{
        y: [0, -floatDistance, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      {text}
    </motion.span>
  );
}
