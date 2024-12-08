import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  page: number;
  totalPages: Pagination;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  return (
    <nav
      className="mt-6 flex items-center justify-between sm:mt-8"
      aria-label="Page navigation example"
    >
      <span className="text-sm font-normal">
        Showing
        <span className="px-1 font-semibold">{totalPages.currentPage}</span>
        of
        <span className="px-1 font-semibold">{totalPages.totalPage}</span>
      </span>
      <ul className="flex h-8 items-center -space-x-px text-sm">
        {page > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(page - 1)}
              className="flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          </li>
        )}
        {Array.from({ length: totalPages.totalPage! }).map((_, i) => (
          <li key={i}>
            <button
              onClick={() => handlePageChange(i + 1)}
              disabled={page === i + 1}
              className={`flex items-center justify-center border border-gray-300 ${
                page === i + 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-500"
              }
            h-8 px-3 text-sm leading-tight hover:bg-gray-100 hover:text-gray-700`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        {page < totalPages.totalPage! && (
          <li>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
