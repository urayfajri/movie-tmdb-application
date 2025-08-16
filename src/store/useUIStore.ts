import create from 'zustand'
import type { Category } from '../api/tmdb'

type UIState = {
  category: Category
  query: string
  page: number
  setCategory: (c: Category) => void
  setQuery: (q: string) => void
  nextPage: () => void
}

export const useUIStore = create<UIState>((set) => ({
  category: 'popular',
  query: '',
  page: 1,
  setCategory: (c) => set({ category: c, page: 1 }),
  setQuery: (q) => set({ query: q, page: 1 }),
  nextPage: () => set((s) => ({ page: s.page + 1 }))
}))
