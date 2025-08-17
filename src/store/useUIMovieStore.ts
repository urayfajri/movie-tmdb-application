import { create } from "zustand";
import { Movie, MovieCategory } from "../types/movie";

type UIMovieState = {
  category: MovieCategory;
  results: Movie[];
  query: string;
  page: number;
  setCategory: (c: MovieCategory) => void;
  setQuery: (q: string) => void;
  setPage: (p: number) => void;
};

export const useUIMovieStore = create<UIMovieState>((set) => ({
  category: "now_playing",
  results: [],
  query: "",
  page: 1,
  setCategory: (c) => set({ category: c, page: 1, query: "" }),
  setQuery: (q) => set({ query: q, page: 1 }),
  setPage: (p) => set({ page: p }),
}));
