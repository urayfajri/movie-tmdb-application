import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail, fetchMovieCredits, imageUrl } from "../api/tmdb";

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

  if (detailQ.isLoading || creditsQ.isLoading)
    return <div className="p-4">Loading...</div>;
  if (detailQ.isError || creditsQ.isError)
    return <div className="p-4 text-red-400">Failed to load</div>;

  console.log("Movie Detail:", creditsQ.data);

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
    <div>
      <button onClick={() => navigate(-1)} className="mb-4 btn">
        ← Back
      </button>
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {movie.poster_path ? (
          <img
            src={imageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="rounded"
          />
        ) : (
          <div className="bg-gray-700 w-72 h-96" />
        )}
        <div>
          <h1 className="text-2xl font-bold">
            {movie.title}{" "}
            {movie.release_date
              ? `(${new Date(movie.release_date).getFullYear()})`
              : ""}
          </h1>
          <p className="italic opacity-80">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-4">
            <strong>Director:</strong> {directors}
          </p>
          <p>
            <strong>Main Cast:</strong> {cast}
          </p>
        </div>
      </div>
    </div>
  );
}
