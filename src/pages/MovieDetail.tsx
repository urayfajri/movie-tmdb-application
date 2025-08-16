import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail, fetchMovieCredits, imageUrl } from "../api/tmdb";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { FaClock, FaDollarSign, FaFilm, FaGlobe, FaStar } from "react-icons/fa";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div className="p-4 text-red-400">Movie ID is required</div>;
  }

  const movieId = Number(id);

  const detailQ = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    enabled: !!movieId,
  });

  const creditsQ = useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => fetchMovieCredits(movieId),
    enabled: !!movieId,
  });

  if (detailQ.isLoading || creditsQ.isLoading) return <Loader />;
  if (detailQ.isError || creditsQ.isError) return <ErrorMessage />;

  const movie = detailQ.data;
  const directors = creditsQ.data.crew
    .filter((c: any) => c.job === "Director")
    .map((d: any) => d.name)
    .join(", ");
  const cast = creditsQ.data.cast
    .slice(0, 8)
    .map((c: any) => c.name)
    .join(", ");

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 text-white rounded btn hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {/* Poster Card */}
        <div className="overflow-hidden rounded shadow">
          {movie.poster_path ? (
            <img
              src={imageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full rounded"
            />
          ) : (
            <div className="grid w-full text-gray-300 bg-gray-700 h-96 place-items-center">
              No Image
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="p-4 space-y-3 bg-gray-800 rounded shadow">
          <h1 className="text-2xl font-bold">
            {movie.title}{" "}
            {movie.release_date
              ? `(${new Date(movie.release_date).getFullYear()})`
              : ""}
          </h1>

          {movie.tagline && (
            <p className="italic opacity-70">"{movie.tagline}"</p>
          )}

          <p>
            <strong>Overview:</strong> {movie.overview || "—"}
          </p>

          {movie.genres?.length > 0 && (
            <p>
              <FaFilm className="inline mr-1" /> <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}

          {movie.runtime && (
            <p>
              <FaClock className="inline mr-1" /> <strong>Runtime:</strong>{" "}
              {movie.runtime} min
            </p>
          )}

          {movie.budget !== undefined && (
            <p>
              <FaDollarSign className="inline mr-1" /> <strong>Budget:</strong>{" "}
              ${movie.budget.toLocaleString()}
            </p>
          )}

          {movie.revenue !== undefined && (
            <p>
              <FaDollarSign className="inline mr-1" /> <strong>Revenue:</strong>{" "}
              ${movie.revenue.toLocaleString()}
            </p>
          )}

          {movie.homepage && (
            <p>
              <FaGlobe className="inline mr-1" /> <strong>Homepage:</strong>{" "}
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {movie.homepage}
              </a>
            </p>
          )}

          {movie.production_countries?.length > 0 && (
            <p>
              <strong>Country:</strong>{" "}
              {movie.production_countries.map((c) => c.name).join(", ")}
            </p>
          )}

          <p>
            <strong>Director:</strong> {directors || "—"}
          </p>

          <p>
            <strong>Main Cast:</strong> {cast || "—"}
          </p>

          {movie.vote_average !== undefined && (
            <p>
              <FaStar className="inline mr-1 text-yellow-400" />{" "}
              <strong>Rating:</strong> {movie.vote_average} / 10 (
              {movie.vote_count} votes)
            </p>
          )}

          {movie.status && (
            <p>
              <strong>Status:</strong> {movie.status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
