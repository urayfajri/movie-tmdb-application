import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import NotFoundPage from "./components/NotFoundPage";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions });

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="movie" replace /> },
        { path: "movie", element: <MovieList /> },
        { path: "movie/:id", element: <MovieDetail /> },
        { path: "*", element: <NotFoundPage /> }, // Catch-all for 404
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </QueryClientProvider>
  </React.StrictMode>
);
