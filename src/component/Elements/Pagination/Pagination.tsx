import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  page: number;
  paginate: Pagination;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ page, paginate, handlePageChange }: PaginationProps) => {
  return (
    <nav
      className="mt-6 flex items-center justify-between sm:mt-8"
      aria-label="Page navigation example"
    >
      <span className="text-sm font-normal">
        Showing
        <span className="px-1 font-semibold">{paginate.current_page}</span>
        of
        <span className="px-1 font-semibold">{paginate.total_pages}</span>
      </span>
      <ul className="flex h-8 items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => handlePageChange(page - 1)}
            className="flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:hidden"
            disabled={page < 1}
          >
            <span className="sr-only">Next</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(paginate.current_page + 1)}
            className={`flex items-center justify-center border border-gray-300 ${
              paginate.current_page
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-500"
            }
            h-8 px-3 text-sm leading-tight hover:bg-gray-100 hover:text-gray-700`}
          >
            {paginate.current_page}
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:hidden"
            disabled={page === paginate.total_pages}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
