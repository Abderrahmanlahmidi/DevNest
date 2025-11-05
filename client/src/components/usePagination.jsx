import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const usePagination  = (data, limit) => {
 
 
  const [page, setPage] = useState(1);

  console.log("pagination data", data);

  const elements = data || [];
  const startIndex = (page - 1) * limit;
  const current = elements.slice(startIndex, startIndex + limit);

  const viewBar = (
     <div className="flex items-center gap-4 mt-8 justify-center">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <FiChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg">
        Page {page} of {Math.ceil(elements.length / limit)}
      </span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={startIndex + limit >= elements.length}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  )

  return {viewBar, current}
};
