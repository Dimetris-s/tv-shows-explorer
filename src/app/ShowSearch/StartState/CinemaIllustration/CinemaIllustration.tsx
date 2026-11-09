import styles from './CinemaIllustration.module.css';
import { dustParticles, seats } from './cinemaScene';

export const CinemaIllustration = () => {
  return (
    <svg
      viewBox="0 0 420 280"
      role="img"
      aria-label="Пустой кинозал, проектор светит на экран"
      className="h-auto w-[480px] max-w-full"
    >
      <defs>
        <linearGradient id="cinema-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0.04" />
        </linearGradient>
        <filter id="cinema-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect
        x="70"
        y="20"
        width="280"
        height="120"
        rx="6"
        fill="var(--card)"
        stroke="var(--primary)"
        strokeOpacity="0.45"
      />
      <rect
        className={styles.grain}
        x="76"
        y="26"
        width="268"
        height="108"
        rx="3"
        filter="url(#cinema-noise)"
      />
      <rect
        className={styles.glow}
        x="76"
        y="26"
        width="268"
        height="108"
        rx="3"
        fill="var(--primary)"
      />
      <g fill="var(--seat)">
        {seats.map((seat) => (
          <rect key={seat.key} x={seat.x} y={seat.y} width="22" height="16" rx="5" />
        ))}
      </g>
      <polygon
        className={styles.beam}
        points="202,256 218,256 350,140 70,140"
        fill="url(#cinema-beam)"
      />
      <g fill="var(--primary-hover)">
        {dustParticles.map((particle) => (
          <circle
            key={particle.delay}
            className={styles.dust}
            cx={particle.cx}
            cy={particle.cy}
            r={particle.r}
            style={{ animationDelay: particle.delay }}
          />
        ))}
      </g>
      <rect
        x="194"
        y="254"
        width="32"
        height="18"
        rx="4"
        fill="var(--secondary)"
        stroke="var(--border-strong)"
      />
      <circle className={styles.lamp} cx="210" cy="256" r="4" fill="var(--primary)" />
    </svg>
  );
};
