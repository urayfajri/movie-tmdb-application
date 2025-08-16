import axios from "axios";
import { Movie, MovieCategory, MovieCredits } from "../types/movie";
import { APIResponseMovieList } from "../types/api-response";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined;
const BEARER = import.meta.env.VITE_TMDB_BEARER as string | undefined;

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: BEARER ? { Authorization: `Bearer ${BEARER}` } : undefined,
  params: BEARER ? {} : { api_key: API_KEY },
});

client.interceptors.request.use((config) => {
  config.params = {
    language: "en-US",
    include_adult: false,
    ...(config.params || {}),
  };
  return config;
});

export const imageUrl = (
  path?: string | null,
  size: "w500" | "original" = "w500"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined);

export async function fetchMovies(
  category: MovieCategory,
  page = 1
): Promise<APIResponseMovieList<Movie>> {
  const { data } = await client.get<APIResponseMovieList<Movie>>(
    `/movie/${category}`,
    { params: { page } }
  );
  return data;
}

export async function fetchMovieDetail(id: number): Promise<Movie> {
  const { data } = await client.get<Movie>(`/movie/${id}`);
  return data;
}

export async function fetchMovieCredits(id: number): Promise<MovieCredits> {
  const { data } = await client.get<MovieCredits>(`/movie/${id}/credits`);
  return data;
}

export async function searchMovies(query: string, page = 1) {
  const { data } = await client.get(`/search/movie`, {
    params: { query, page },
  });
  return data;
}
