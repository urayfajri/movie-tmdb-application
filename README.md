# TMDB Vite React Query Zustand (with CI & Tests)

Stack:
- React 18 + Vite + TypeScript
- Tailwind CSS (utility styling)
- React Query for fetching & caching (with prefetch on hover)
- Zustand for UI state (category, query, page)
- React Router for navigation
- Jest + React Testing Library for unit tests
- GitHub Actions workflow for CI (tests + build)

## Run locally
1. Install
   ```bash
   npm install
   cp .env.example .env
   # fill VITE_TMDB_API_KEY
   ```
2. Dev
   ```bash
   npm run dev
   ```
3. Tests
   ```bash
   npm run test
   ```

## Deploy
Use Vercel or Netlify. Set environment variable `VITE_TMDB_API_KEY` in the platform.

## Notes
- Prefetch detail occurs on hover (300ms debounce) and caches for 5 minutes.
- Pagination implemented as Load More (Zustand manages `page`).
