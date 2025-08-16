// components/NoDataFullScreen.tsx
export default function NotFound({
  message = "No data available",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <svg
        className="w-20 h-20 mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <p className="text-xl text-gray-500">{message}</p>
    </div>
  );
}
