export default function ErrorMessage({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return (
    <div
      role="alert"
      className="p-4 text-red-500 bg-red-100 border border-red-300 rounded"
    >
      {message}
    </div>
  );
}
