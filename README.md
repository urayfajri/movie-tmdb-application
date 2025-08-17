# TMDB Vite React

Stack:

- React 18 + Vite + TypeScript
- Tailwind CSS (utility styling)
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

Using Vercel with environment variable `VITE_TMDB_API_KEY` in the platform.

## Notes

- Pagination implemented as Number Page (Zustand manages `page`).
