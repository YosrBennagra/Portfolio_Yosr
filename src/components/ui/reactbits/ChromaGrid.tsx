import clsx from 'clsx';

export type ChromaGridProps = {
  className?: string;
};

export default function ChromaGrid({ className }: ChromaGridProps) {
  return (
    <div className={clsx('chroma-grid absolute inset-0 opacity-60', className)} aria-hidden />
  );
}
