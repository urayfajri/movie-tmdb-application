import axios from "axios";
import { Movie, MovieCategory, MovieCredits } from "../types/movie";
import { APIResponseMovieList } from "../types/api-response";
import { client } from "../helpers/config";
import { get } from "../helpers/params";

export const imageUrl = (
  path?: string | null,
  size: "w500" | "original" = "w500"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined);

// Fetch movies by category
export const fetchMovies = (category: MovieCategory, page = 1) =>
  get<APIResponseMovieList<Movie>>(`/movie/${category}`, { page });

// Fetch single movie detail
export const fetchMovieDetail = (id: number) => get<Movie>(`/movie/${id}`);

// Fetch movie credits (cast & crew)
export const fetchMovieCredits = (id: number) =>
  get<MovieCredits>(`/movie/${id}/credits`);

// Search movies by query
export const searchMovies = (query: string, page = 1) =>
  get<APIResponseMovieList<Movie>>(`/search/movie`, { query, page });
