export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number;
  revenue: number;
  tagline: string;
  homepage: string;
  status: string;
  budget: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path?: string | null;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
};

export type MovieCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type MovieCredits = {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
};
