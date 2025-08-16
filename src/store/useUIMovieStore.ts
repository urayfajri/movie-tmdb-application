import create from "zustand";
import { Movie, MovieCategory } from "../types/movie";

type UIMovieState = {
  category: MovieCategory;
  results: Movie[];
  query: string;
  page: number;
  setCategory: (c: MovieCategory) => void;
  setQuery: (q: string) => void;
  nextPage: () => void;
};

export const useUIMovieStore = create<UIMovieState>((set) => ({
  category: "now_playing",
  results: [],
  query: "",
  page: 1,
  setCategory: (c) => set({ category: c, page: 1 }),
  setQuery: (q) => set({ query: q, page: 1 }),
  nextPage: () => set((s) => ({ page: s.page + 1 })),
}));
