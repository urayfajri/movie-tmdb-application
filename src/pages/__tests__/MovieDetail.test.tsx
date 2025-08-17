import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieDetail from "../MovieDetail";
import * as reactQuery from "@tanstack/react-query";
import * as router from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

// Mock react-router
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock react-query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

// Mock API
jest.mock("../../api/tmdb", () => ({
  fetchMovieDetail: jest.fn(),
  fetchMovieCredits: jest.fn(),
  imageUrl: (path: string) => `https://image.tmdb.org/t/p/w500${path}`,
}));

describe("MovieDetail", () => {
  const mockNavigate = jest.fn();
  const mockMovie = {
    title: "Inception",
    release_date: "2010-07-16",
    overview: "A dream within a dream",
    poster_path: "/poster.jpg",
    genres: [{ name: "Action" }],
    runtime: 148,
    budget: 160000000,
    revenue: 825532764,
    homepage: "https://www.inceptionmovie.com/",
    production_countries: [{ name: "United States" }],
    vote_average: 8.8,
    vote_count: 21000,
    status: "Released",
    tagline: "Your mind is the scene of the crime",
  };

  const mockCredits = {
    cast: [{ name: "Leonardo DiCaprio" }],
    crew: [{ name: "Christopher Nolan", job: "Director" }],
  };

  beforeEach(() => {
    (router.useParams as jest.Mock).mockReturnValue({ id: "1" });
    (router.useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (reactQuery.useQuery as jest.Mock)
      .mockImplementationOnce(() => ({
        data: mockMovie,
        isLoading: false,
        isError: false,
      }))
      .mockImplementationOnce(() => ({
        data: mockCredits,
        isLoading: false,
        isError: false,
      }));
  });

  it("renders error message when API fails", () => {
    (reactQuery.useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: true,
    }));

    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <MovieDetail />
      </MemoryRouter>
    );

    render(<ErrorMessage />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Something went wrong/i
    );
  });

  it("shows 'Movie ID is required' if no id param", () => {
    (router.useParams as jest.Mock).mockReturnValue({});
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <MovieDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Movie ID is required/i)).toBeInTheDocument();
  });

  it("renders movie details correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <MovieDetail />
      </MemoryRouter>
    );

    // Heading gabungan title + year
    expect(
      screen.getByRole("heading", { name: /Inception.*2010/i })
    ).toBeInTheDocument();

    // Overview
    expect(screen.getByText(/A dream within a dream/i)).toBeInTheDocument();

    // Director & Cast
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeInTheDocument();

    // Button back
    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
