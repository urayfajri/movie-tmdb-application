import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb";
import { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="overflow-hidden card">
      <Link to={`/movie/${movie.id}`} className="block">
        {movie.poster_path ? (
          <img
            src={imageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] grid place-items-center bg-gray-700 text-gray-300">
            No Image
          </div>
        )}
      </Link>
      <div className="p-3">
        <Link
          to={`/movie/${movie.id}`}
          className="font-semibold line-clamp-1"
          title={movie.title}
        >
          {movie.title}
        </Link>
        <div className="text-sm opacity-70">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "—"}
        </div>
      </div>
    </div>
  );
}
