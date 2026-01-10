// SVG icons for workout types matching the calendar design

export const YogaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="32" cy="12" r="6" />
    <path d="M32 20c-2 0-4 1-5 3l-8 14c-1 2 0 4 2 5s4 0 5-2l6-10 6 10c1 2 3 3 5 2s3-3 2-5l-8-14c-1-2-3-3-5-3z" />
    <path d="M16 52c-1 0-2-1-2-2s1-2 2-2h10l6-10 6 10h10c1 0 2 1 2 2s-1 2-2 2H16z" />
  </svg>
);

export const UpperBodyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="32" cy="10" r="6" />
    <path d="M32 18c-3 0-5 2-5 5v8h-12c-2 0-3 1-3 3s1 3 3 3h12v15c0 2 2 4 5 4s5-2 5-4V37h12c2 0 3-1 3-3s-1-3-3-3H37v-8c0-3-2-5-5-5z" />
  </svg>
);

export const AbsIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="44" cy="8" r="5" />
    <path d="M52 22c-1-2-3-3-5-2l-8 4-12-6c-2-1-4 0-5 2l-8 16c-1 2 0 4 2 5s4 0 5-2l6-12 8 4-6 12c-1 2 0 4 2 5l12 6c2 1 4 0 5-2l8-16c1-2 0-4-2-5l-4-2 6-4c2-1 2-3 1-5l-5 2z" />
    <ellipse cx="16" cy="54" rx="4" ry="3" />
  </svg>
);

export const LowerBodyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="20" cy="10" r="6" />
    <path d="M28 18c-2-1-4 0-5 2L12 36v-8c0-2-2-4-4-4s-4 2-4 4v20c0 2 2 4 4 4s4-2 4-4v-4l16-20 8 12v16c0 2 2 4 4 4s4-2 4-4V36l10 10c1 1 3 2 5 1s2-3 1-5L44 24c-1-2-3-2-5-1l-11 11-4-8 6-6c1-2 1-4-2-2z" />
  </svg>
);

export const FullBodyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <circle cx="32" cy="8" r="6" />
    <path d="M32 16c-3 0-5 2-5 5v10l-8 18c-1 2 0 4 2 5s4 0 5-2l6-14 6 14c1 2 3 3 5 2s3-3 2-5l-8-18V21c0-3-2-5-5-5z" />
    <path d="M20 26h-6c-2 0-4 2-4 4s2 4 4 4h6l6-4-6-4zM44 26h6c2 0 4 2 4 4s-2 4-4 4h-6l-6-4 6-4z" />
  </svg>
);

export const RestIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor" opacity="0.5">
    <path d="M32 8c-13 0-24 11-24 24s11 24 24 24 24-11 24-24S45 8 32 8zm0 44c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" />
    <circle cx="24" cy="28" r="3" />
    <circle cx="40" cy="28" r="3" />
    <path d="M40 40c0-4-4-8-8-8s-8 4-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
