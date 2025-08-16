import "@testing-library/jest-dom";

// Mock Vite's import.meta.env in Jest
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_TMDB_API_KEY: "ef52f7da1f4e8facbc19e65e6b1603aafff",
    VITE_TMDB_BEARER:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlZjUyZjdkYTFmNGU4ZmFjYmMxOWU2NWU2YjE2MDNhYWZmZiIsInN1YiI6IjYzYjQwZDY0YzQ3MjQwMDAxYjA0ZDI3NyIsImlhdCI6MTY5Njg4MzE5OSwiZXhwIjoxNzAyNDk1MTk5fQ.7b8d7e",
  },
  writable: true,
});
