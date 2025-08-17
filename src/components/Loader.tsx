import { test } from "@jest/globals";
// components/Loader.tsx
export default function Loader({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[600px]">
      {/* Spinner */}
      <div
        role="status"
        aria-label="loading"
        data-testid="loader"
        className="w-12 h-12 mb-4 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"
      ></div>
      {/* Optional message */}
      <span className="text-center text-gray-500">{message}</span>
    </div>
  );
}
