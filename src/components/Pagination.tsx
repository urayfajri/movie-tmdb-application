import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* First */}
      <button
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </button>

      {/* Prev */}
      <button
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded ${
            num === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      {/* Last */}
      <button
        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
