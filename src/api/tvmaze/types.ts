/** DTOs of the TVmaze API: https://www.tvmaze.com/api */

export type TvmazeCountry = {
  name: string;
  code: string;
  timezone: string;
};

export type TvmazeChannel = {
  id: number;
  name: string;
  country: TvmazeCountry | null;
};

export type TvmazeImage = {
  medium: string;
  original: string;
};

export type TvmazeShowStatus = 'Running' | 'Ended' | 'To Be Determined' | 'In Development';

export type TvmazeShow = {
  id: number;
  url: string;
  name: string;
  /** Scripted, Reality, Animation, Documentary, Talk Show, … */
  type: string;
  language: string | null;
  genres: string[];
  status: TvmazeShowStatus | (string & {});
  runtime: number | null;
  averageRuntime: number | null;
  /** ISO date, e.g. `2012-08-26`. */
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  rating: { average: number | null };
  network: TvmazeChannel | null;
  webChannel: TvmazeChannel | null;
  image: TvmazeImage | null;
  /** HTML markup. */
  summary: string | null;
};

export type TvmazeSearchResult = {
  score: number;
  show: TvmazeShow;
};
