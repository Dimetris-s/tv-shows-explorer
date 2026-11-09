export const TvErrorIllustration = () => {
  return (
    <svg width="240" height="200" viewBox="0 0 240 200" aria-hidden="true" className="shrink-0">
      <path
        d="M90 18 L120 46 L150 10"
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="20"
        y="46"
        width="200"
        height="130"
        rx="18"
        fill="var(--secondary)"
        stroke="var(--border-strong)"
        strokeWidth="2"
      />
      <rect x="36" y="60" width="140" height="102" rx="10" fill="var(--background)" />
      <path
        d="M84 96 L96 108 M96 96 L84 108 M116 96 L128 108 M128 96 L116 108"
        stroke="var(--destructive)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M86 136 Q106 124 126 136"
        fill="none"
        stroke="var(--destructive)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="198" cy="84" r="8" fill="var(--destructive)" />
      <circle cx="198" cy="112" r="6" fill="var(--border-strong)" />
      <rect x="60" y="176" width="14" height="14" rx="3" fill="var(--border-strong)" />
      <rect x="166" y="176" width="14" height="14" rx="3" fill="var(--border-strong)" />
    </svg>
  );
};
