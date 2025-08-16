import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail, fetchCredits, imageUrl } from '../api/tmdb'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const detailQ = useQuery(['movie', id], () => fetchMovieDetail(id!), { enabled: !!id })
  const creditsQ = useQuery(['movie', id, 'credits'], () => fetchCredits(id!), { enabled: !!id })

  if (detailQ.isLoading || creditsQ.isLoading) return <div className="p-4">Loading...</div>
  if (detailQ.isError || creditsQ.isError) return <div className="p-4 text-red-400">Failed to load</div>

  const movie = detailQ.data
  const directors = creditsQ.data.crew.filter((c: any) => c.job === 'Director').map((d: any) => d.name).join(', ')
  const cast = creditsQ.data.cast.slice(0,8).map((c: any) => c.name).join(', ')

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn mb-4">← Back</button>
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {movie.poster_path ? <img src={imageUrl(movie.poster_path, 'w500')} alt={movie.title} className="rounded" /> : <div className="w-72 h-96 bg-gray-700" />}
        <div>
          <h1 className="text-2xl font-bold">{movie.title} {movie.release_date ? `(${new Date(movie.release_date).getFullYear()})` : ''}</h1>
          <p className="italic opacity-80">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-4"><strong>Director:</strong> {directors}</p>
          <p><strong>Main Cast:</strong> {cast}</p>
        </div>
      </div>
    </div>
  )
}
