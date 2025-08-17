// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold text-gray-700">404</h1>
      <p className="mb-6 text-xl text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/movie"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
      >
        Go Back to Movies
      </Link>
    </div>
  );
}
