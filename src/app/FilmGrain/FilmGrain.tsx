export const FilmGrain = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <svg className="absolute inset-0 size-full">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" opacity="0.11" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_45%,rgb(0_0_0/0.7)_100%)]" />
    </div>
  );
};
