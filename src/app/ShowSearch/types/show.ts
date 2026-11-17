export type Show = {
  id: number;
  name: string;
  type: string;
  genres: string[];
  isRunning: boolean;
  premiered: string | null;
  ended: string | null;
  runtime: number | null;
  channel: string | null;
  rating: number | null;
  posterUrl: string | null;
  summary: string;
};
