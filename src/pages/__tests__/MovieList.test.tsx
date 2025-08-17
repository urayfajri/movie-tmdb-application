import { render, screen, act } from "@testing-library/react";
import MovieList from "../MovieList";
import { useUIMovieStore } from "../../store/useUIMovieStore";
import { useMovies } from "../../hooks/useMovies";
import { Movie } from "../../types/movie";
import { MemoryRouter } from "react-router-dom";

// Mock store
jest.mock("../../store/useUIMovieStore");
jest.mock("../../hooks/useMovies");

jest.useFakeTimers();

const mockSetCategory = jest.fn();
const mockSetQuery = jest.fn();
const mockSetPage = jest.fn();

const mockMovie: Movie = {
  id: 1,
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

describe("MovieList", () => {
  beforeEach(() => {
    (useUIMovieStore as unknown as jest.Mock).mockReturnValue({
      category: "popular",
      query: "",
      page: 1,
      setCategory: mockSetCategory,
      setQuery: mockSetQuery,
      setPage: mockSetPage,
    });
  });

  it("renders Loader while loading", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<MovieList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders ErrorMessage on error", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<MovieList />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders movies when data is available", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: { results: [mockMovie], page: 1, total_pages: 1 },
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <MovieList />
      </MemoryRouter>
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders NotFound when no movies found", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: { results: [], page: 1, total_pages: 1 },
      isLoading: false,
      isError: false,
    });

    render(<MovieList />);
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });

  it("renders movies after debounce", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: { results: [mockMovie], page: 1, total_pages: 1 },
      isLoading: false,
      isError: false,
    });

    act(() => {
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <MovieList />
        </MemoryRouter>
      );

      jest.runAllTimers();
    });

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });
});
