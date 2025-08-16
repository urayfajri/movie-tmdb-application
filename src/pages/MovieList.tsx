import { useEffect } from "react";
import { useUIMovieStore } from "../store/useUIMovieStore";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/movie";

export default function MovieList() {
  const { category, query, page, setCategory, setQuery, nextPage } =
    useUIMovieStore();
  const { data, isLoading, isError } = useMovies(category, page, query);

  useEffect(() => {
    // no-op: store handles resets
  }, [category, query]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-400">Failed to load</div>;

  return (
    <section>
      <div className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          {(["now_playing", "popular", "top_rated", "upcoming"] as const).map(
            (c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded ${
                  category === c ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {c.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data?.results?.map((m: Movie) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <div className="mt-6 text-center">
        {data && data.page < data.total_pages ? (
          <button className="btn" onClick={() => nextPage()}>
            Load More
          </button>
        ) : (
          <div className="opacity-70">End of list</div>
        )}
      </div>
    </section>
  );
}
