import { use, useEffect, useState } from "react";
import { useUIMovieStore } from "../store/useUIMovieStore";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/movie";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import Pagination from "../components/Pagination";

export default function MovieList() {
  const { category, query, page, setCategory, setQuery, setPage } =
    useUIMovieStore();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Debounce query: update after 2 seconds idle
  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError } = useMovies(
    category,
    page,
    debouncedQuery
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <section>
      <div className="flex flex-col gap-3 mb-4">
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full pr-10 input"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isDebouncing && (
            <div className="absolute w-5 h-5 -translate-y-1/2 border-4 border-blue-500 rounded-full top-1/2 right-3 animate-spin"></div>
          )}
        </div>

        {/* Filter by Category */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center w-full text-sm font-medium text-gray-500 sm:w-auto">
            <span className="text-gray-500 ">Filter by Category:</span>
          </div>
          {(["now_playing", "popular", "top_rated", "upcoming"] as const).map(
            (c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded font-medium ${
                  category === c
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {c.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        {data?.results && data.results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {data.results.map((m: Movie) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={data.page}
              totalPages={data.total_pages}
              onPageChange={(page) => setPage(page)}
            />
          </>
        ) : (
          <NotFound message="No movies found" />
        )}
      </div>
    </section>
  );
}
