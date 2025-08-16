import { Link } from 'react-router-dom'
import { imageUrl } from '../api/tmdb'
import type { Movie } from '../types'
import { useQueryClient } from '@tanstack/react-query'
import { fetchMovieDetail } from '../api/tmdb'
import { useRef } from 'react'

export default function MovieCard({ movie }: { movie: Movie }) {
  const qc = useQueryClient()
  const tRef = useRef<number | null>(null)

  const handleEnter = () => {
    tRef.current = window.setTimeout(() => {
      qc.prefetchQuery(['movie', movie.id], () => fetchMovieDetail(movie.id), { staleTime: 1000 * 60 * 5 })
    }, 300)
  }
  const handleLeave = () => {
    if (tRef.current) {
      clearTimeout(tRef.current)
      tRef.current = null
    }
  }

  return (
    <div className="card overflow-hidden" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link to={`/movie/${movie.id}`} className="block">
        {movie.poster_path ? (
          <img src={imageUrl(movie.poster_path, 'w500')} alt={movie.title} className="w-full aspect-[2/3] object-cover" loading="lazy" />
        ) : (
          <div className="w-full aspect-[2/3] grid place-items-center bg-gray-700 text-gray-300">No Image</div>
        )}
      </Link>
      <div className="p-3">
        <Link to={`/movie/${movie.id}`} className="font-semibold line-clamp-1" title={movie.title}>{movie.title}</Link>
        <div className="text-sm opacity-70">{movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}</div>
      </div>
    </div>
  )
}
