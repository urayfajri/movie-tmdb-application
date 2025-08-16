import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMovies, searchMovies, fetchMovieDetail } from '../api/tmdb'
import type { Category } from '../api/tmdb'

export function useMovies(category: Category, page: number, query: string) {
  const isSearching = query.trim().length > 0
  const key = ['movies', { category, query, page }]
  return useQuery({
    queryKey: key,
    queryFn: () => (isSearching ? searchMovies(query, page) : fetchMovies(category, page)),
    keepPreviousData: true,
  })
}

export function usePrefetchMovie(id: number) {
  const qc = useQueryClient()
  return (delay = 300) => {
    qc.prefetchQuery({
      queryKey: ['movie', id],
      queryFn: () => fetchMovieDetail(id),
      staleTime: 1000 * 60 * 5,
    })
  }
}
