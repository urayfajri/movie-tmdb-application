import { Routes, Route, Link } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <div className="container py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🎬 TMDB Movies</h1>
      </header>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}
