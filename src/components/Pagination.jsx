import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    return [...pages]
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center pt-7.5 pb-12.5">
      <div className="flex items-center gap-1.5 bg-(--bg-card) border border-(--border) rounded-full px-3 py-2 shadow-lg">

        <button
          className="w-9 h-9 flex items-center justify-center rounded-full border-none bg-transparent cursor-pointer
          text-(--text-secondary) transition-all duration-200 hover:bg-(--bg-secondary) hover:text-(--primary)
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page, index) => {
          const prevPage = pages[index - 1];
          const showGap = prevPage && page - prevPage > 1;

          return (
            <div key={page} className="flex items-center gap-1.5">
              {showGap && (
                <span className="w-9 h-9 flex items-center justify-center text-(--text-muted) text-sm select-none">
                  ⋯
                </span>
              )}

              <button
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border-none cursor-pointer
                text-sm font-semibold transition-all duration-200 ${
                  page === currentPage
                    ? "bg-(--primary) text-(--on-primary) scale-105 shadow-md"
                    : "bg-transparent text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text)"
                }`}
              >
                {page}
              </button>
            </div>
          );
        })}

        <button
          className="w-9 h-9 flex items-center justify-center rounded-full border-none bg-transparent cursor-pointer
          text-(--text-secondary) transition-all duration-200 hover:bg-(--bg-secondary) hover:text-(--primary)
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}

export default Pagination;