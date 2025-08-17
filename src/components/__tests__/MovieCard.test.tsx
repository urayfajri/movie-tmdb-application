// MovieCard.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Movie } from "../../types/movie";
import MovieCard from "../MovieCard";

const mockMovie: Movie = {
  id: 123,
  title: "Inception",
  poster_path: "/poster.jpg",
  release_date: "2010-07-16",
  overview: "A dream within a dream",
  vote_average: 8.8,
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  original_language: "",
  original_title: "",
  popularity: 0,
  video: false,
  vote_count: 0,
  genres: [],
  runtime: 0,
  revenue: 0,
  tagline: "",
  homepage: "",
  status: "",
  budget: 0,
  spoken_languages: [],
  production_companies: [],
  production_countries: [],
};

describe("MovieCard", () => {
  it("renders movie title and release year", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true }}>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    // cek title
    expect(screen.getByText("Inception")).toBeInTheDocument();

    // cek tahun dari release_date
    expect(screen.getByText("2010")).toBeInTheDocument();
  });

  it("renders poster image when poster_path exists", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true }}>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img", { name: /Inception/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("/poster.jpg"));
  });

  it("renders fallback when no poster_path", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };

    render(
      <MemoryRouter future={{ v7_startTransition: true }}>
        <MovieCard movie={movieWithoutPoster as Movie} />
      </MemoryRouter>
    );

    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("links to movie detail page", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true }}>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const link = screen.getAllByRole("link")[0];
    expect(link).toHaveAttribute("href", "/movie/123");
  });
});
