/**
 * DTR All-Seeing-Eye brand mark.
 * Used in TopNav, Footer, etc.
 */
export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DTR brand mark"
      role="img"
    >
      {/* Outer eye outline (almond) */}
      <path
        d="M2 32 Q32 8, 62 32 Q32 56, 2 32 Z"
        stroke="currentColor"
        strokeWidth="3"
        className="text-accent"
        fill="none"
      />
      {/* Inner circle (iris) */}
      <circle
        cx="32"
        cy="32"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="text-accent"
        fill="none"
      />
      {/* Center pupil */}
      <circle
        cx="32"
        cy="32"
        r="3"
        className="fill-accent text-accent"
      />
      {/* Triangle below — DTR geometric signature */}
      <path
        d="M24 50 L32 44 L40 50 Z"
        className="fill-accent text-accent"
      />
    </svg>
  );
}
