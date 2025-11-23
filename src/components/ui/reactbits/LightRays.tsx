import clsx from 'clsx';

export type LightRaysProps = {
  className?: string;
};

export default function LightRays({ className }: LightRaysProps) {
  return (
    <div className={clsx('light-rays pointer-events-none absolute inset-0 overflow-hidden -z-10', className)} aria-hidden>
      <div className="light-ray" />
      <div className="light-ray delay-200" />
      <div className="light-ray delay-500" />
    </div>
  );
}
