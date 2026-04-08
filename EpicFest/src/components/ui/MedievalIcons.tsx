interface IconProps {
  className?: string;
  size?: number;
}

export function DragonIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M36 8c-2 0-4 2-6 4l-2 3-4-3c-2-2-5-3-7-2-3 1-4 4-4 7 0 2 1 5 3 7l8 8 2 2c1 1 3 2 5 2s4-1 5-3l3-5c2-3 2-6 1-9-1-4-3-7-4-8-1-2-1-3 0-3z" fill="currentColor" opacity="0.7"/>
      <path d="M24 20l-4 6 3 3 5-5-4-4z" fill="currentColor" opacity="0.9"/>
      <circle cx="32" cy="14" r="1.5" fill="currentColor"/>
      <path d="M14 18c-2 1-3 3-2 5l2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function SwordIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M12 36l2-2 18-18 4 4-18 18-2 2-4-4z" fill="currentColor" opacity="0.3"/>
      <path d="M32 16L14 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M30 10l8-2-2 8-3-3-3-3z" fill="currentColor" opacity="0.8"/>
      <path d="M16 32l-4 4-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 37l-1 3 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 30l-4 0 0 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function ShieldIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6L8 14v10c0 10 8 16 16 18 8-2 16-8 16-18V14L24 6z" fill="currentColor" opacity="0.2"/>
      <path d="M24 6L8 14v10c0 10 8 16 16 18 8-2 16-8 16-18V14L24 6z" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14v20M16 22h16" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

export function GobletIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M16 8h16v6c0 6-3 10-8 12-5-2-8-6-8-12V8z" fill="currentColor" opacity="0.3"/>
      <path d="M16 8h16v6c0 6-3 10-8 12-5-2-8-6-8-12V8z" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 26v6" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 34h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 36h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M34 12c2 1 3 3 3 5s-1 4-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function CrystalBallIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="20" r="12" fill="currentColor" opacity="0.15"/>
      <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="2"/>
      <ellipse cx="24" cy="34" rx="8" ry="2" fill="currentColor" opacity="0.3"/>
      <path d="M20 36h8v4h-8z" fill="currentColor" opacity="0.4"/>
      <path d="M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 16c-1 2-1 4 0 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <circle cx="28" cy="17" r="1" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function ScrollIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M12 10c0-2 2-4 4-4h20c0 2-2 4-4 4H12z" fill="currentColor" opacity="0.4"/>
      <rect x="12" y="10" width="20" height="28" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="12" y="10" width="20" height="28" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 38c0 2 2 4 4 4h20c0-2-2-4-4-4H12z" fill="currentColor" opacity="0.4"/>
      <path d="M16 16h12M16 21h10M16 26h12M16 31h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function HelmIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M12 24c0-8 6-14 12-14s12 6 12 14v4c0 2-1 4-3 5l-3 2H18l-3-2c-2-1-3-3-3-5v-4z" fill="currentColor" opacity="0.25"/>
      <path d="M12 24c0-8 6-14 12-14s12 6 12 14v4c0 2-1 4-3 5l-3 2H18l-3-2c-2-1-3-3-3-5v-4z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 24h24" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 24v8M24 24v8M30 24v8" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <path d="M24 10v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function FireIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4c0 8-10 14-10 24 0 8 4 12 10 16 6-4 10-8 10-16C34 18 24 12 24 4z" fill="currentColor" opacity="0.3"/>
      <path d="M24 4c0 8-10 14-10 24 0 8 4 12 10 16 6-4 10-8 10-16C34 18 24 12 24 4z" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 18c0 4-4 7-4 12 0 3 2 5 4 6 2-1 4-3 4-6 0-5-4-8-4-12z" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}
