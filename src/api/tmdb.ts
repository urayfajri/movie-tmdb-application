import axios from 'axios'
import type { Movie } from '../types'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined
const BEARER = import.meta.env.VITE_TMDB_BEARER as string | undefined

export const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: BEARER ? { Authorization: `Bearer ${BEARER}` } : undefined,
  params: BEARER ? {} : { api_key: API_KEY }
})

client.interceptors.request.use((config) => {
  config.params = { language: 'en-US', include_adult: false, ...(config.params || {}) }
  return config
})

export type Category = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

export const imageUrl = (path?: string | null, size: 'w500' | 'original' = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined

export async function fetchMovies(category: Category, page = 1) {
  const { data } = await client.get(`/movie/${category}`, { params: { page } })
  return data
}

export async function searchMovies(query: string, page = 1) {
  const { data } = await client.get(`/search/movie`, { params: { query, page } })
  return data
}

export async function fetchMovieDetail(id: string | number) {
  const { data } = await client.get(`/movie/${id}`)
  return data
}

export async function fetchCredits(id: string | number) {
  const { data } = await client.get(`/movie/${id}/credits`)
  return data
}
