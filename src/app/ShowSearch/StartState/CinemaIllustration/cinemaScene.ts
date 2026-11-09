const SEAT_ROWS = [
  { y: 168, xs: [70, 98, 126, 154, 244, 272, 300, 328] },
  { y: 196, xs: [56, 84, 112, 140, 258, 286, 314, 342] },
  { y: 224, xs: [42, 70, 98, 126, 272, 300, 328, 356] },
];

export const seats = SEAT_ROWS.flatMap(({ y, xs }) => xs.map((x) => ({ key: `${x}-${y}`, x, y })));

export const dustParticles = [
  { cx: 180, cy: 220, r: 1.4, delay: '0s' },
  { cx: 230, cy: 200, r: 1.1, delay: '1.2s' },
  { cx: 200, cy: 180, r: 1.6, delay: '2.5s' },
  { cx: 160, cy: 170, r: 1, delay: '3.4s' },
  { cx: 255, cy: 175, r: 1.3, delay: '4.6s' },
  { cx: 210, cy: 235, r: 1.2, delay: '5.2s' },
];
