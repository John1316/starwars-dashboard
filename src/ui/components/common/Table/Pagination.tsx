// components/Table/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  return (
    <div className={`flex items-center justify-center gap-2 mt-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 py-2 rounded-lg border-2 border-[var(--lightsaber-blue)] text-[var(--lightsaber-blue)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--hologram-blue)] transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--lightsaber-blue)]  transition-colors ${
              currentPage === page
                ? 'bg-[var(--lightsaber-blue)] text-white'
                : 'text-lightsaber-blue'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 py-2 rounded-lg border-2 border-[var(--lightsaber-blue)] text-[var(--lightsaber-blue)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--hologram-blue)] transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
