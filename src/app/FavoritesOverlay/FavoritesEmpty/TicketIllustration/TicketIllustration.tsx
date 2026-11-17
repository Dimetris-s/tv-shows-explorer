export const TicketIllustration = () => {
  return (
    <svg width="240" height="200" viewBox="0 0 240 200" aria-hidden="true" className="shrink-0">
      <path
        d="M30 50 H210 V82 A18 18 0 0 0 210 118 V150 H30 V118 A18 18 0 0 0 30 82 Z"
        fill="var(--secondary)"
        stroke="var(--border-strong)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M160 58 V142" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 6" />
      <polygon
        points="96 72 103.6 87.4 120.6 89.9 108.3 101.9 111.2 118.8 96 110.8 80.8 118.8 83.7 101.9 71.4 89.9 88.4 87.4"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeDasharray="7 5"
      />
      <rect x="174" y="78" width="22" height="6" rx="3" fill="var(--border-strong)" />
      <rect x="174" y="97" width="22" height="6" rx="3" fill="var(--border-strong)" />
      <rect x="174" y="116" width="22" height="6" rx="3" fill="var(--border-strong)" />
    </svg>
  );
};
