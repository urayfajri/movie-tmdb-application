import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchMovies, searchMovies, fetchMovieDetail } from "../api/tmdb";
import { Movie, MovieCategory } from "../types/movie";
import { APIResponseMovieList } from "../types/api-response";

export function useMovies(
  category: MovieCategory,
  page: number,
  query: string
) {
  const isSearching = query.trim().length > 0;
  const key = ["movies", { category, query, page }];

  return useQuery<APIResponseMovieList<Movie>>({
    queryKey: key,
    queryFn: () =>
      isSearching ? searchMovies(query, page) : fetchMovies(category, page),
    placeholderData: keepPreviousData,
  });
}

export function usePrefetchMovie(id: number) {
  const qc = useQueryClient();
  return (delay = 300) => {
    qc.prefetchQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieDetail(id),
      staleTime: 1000 * 60 * 5,
    });
  };
}
