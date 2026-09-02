export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="DR.UY"
    >
      <rect width="64" height="64" rx="14" fill="#14324f" />
      <path
        d="M20 16h9c9.4 0 16 6.6 16 16s-6.6 16-16 16h-9V16zm8 25c5.6 0 9-3.6 9-9s-3.4-9-9-9h-1v18h1z"
        fill="#ffffff"
      />
      <rect x="30" y="30" width="14" height="4" rx="2" fill="#0e9aa1" />
      <rect x="35" y="25" width="4" height="14" rx="2" fill="#0e9aa1" />
    </svg>
  );
}

export function Marca({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Logo size={size} />
      <span className="font-display font-bold text-navy tracking-tight">
        DR<span className="text-teal">.UY</span>
      </span>
    </span>
  );
}
