// components/Table/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  // console.log("🚀 ~ totalPages:", !totalPages , totalPages < 2)
  if(!totalPages || totalPages < 2){
     return
  }
  return (
    <div className={`flex items-center justify-center gap-2 mt-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center md:px-3 md:py-2 px-1.5 py-1 rounded-lg border-2 border-[var(--rebel-yellow)] text-[var(--rebel-yellow)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--hologram-blue)] transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center md:px-3 md:py-2 px-1.5 py-1 rounded-lg border-2 border-[var(--rebel-yellow)]  transition-colors ${
              currentPage === page
                ? 'bg-[var(--rebel-yellow)] text-white'
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
        className="flex items-center justify-center md:px-3 md:py-2 px-1.5 py-1 rounded-lg border-2 border-[var(--rebel-yellow)] text-[var(--rebel-yellow)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--hologram-blue)] transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
