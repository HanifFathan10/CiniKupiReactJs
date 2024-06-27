import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import {
  DeleteHistoryTransaction,
  getAllHistoryTransaction,
} from "../../../services/PaymentService";
import { rupiah } from "../../../Hooks/useRupiah";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Plus from "../../../component/Elements/Icon/Plus";
import { useDebounce } from "use-debounce";

const TransactionDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState({});
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataTransaction = async () => {
      setLoading(true);

      try {
        const data = {
          page,
          limit,
          search: debounceSearch,
        };

        await getAllHistoryTransaction((status, res) => {
          if (status === true) {
            setUsers(res.data);
            setTotalPages(res);
            setLoading(false);
          }
        }, data);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDataTransaction();
  }, [debounceSearch, page, limit]);

  const handleSearchTransaction = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteUser = async (_id) => {
    await DeleteHistoryTransaction(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" description="users dashboard" />
      <AdminLayouts>
        <div class="relative overflow-auto bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    value={search}
                    onChange={handleSearchTransaction}
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Search Transactions"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <div class="flex w-full items-center space-x-3 md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                  type="button"
                >
                  <ChevronDownIcon class="-ml-1 mr-1 h-5 w-5" />
                  Actions
                </button>
                <div
                  id="actionsDropdown"
                  class="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mass Edit
                      </a>
                    </li>
                  </ul>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete all
                    </a>
                  </div>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="mr-2 h-4 w-4 text-gray-400"
                    viewbox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    class="-mr-1 ml-1.5 h-5 w-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                <div
                  id="filterDropdown"
                  class="z-10 hidden w-48 rounded-lg bg-white p-3 shadow dark:bg-gray-700"
                >
                  <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul
                    class="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li class="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                      />
                      <label
                        for="apple"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Apple (56)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                      />
                      <label
                        for="fitbit"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Microsoft (16)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                      />
                      <label
                        for="razor"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Razor (49)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="nikon"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                      />
                      <label
                        for="nikon"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Nikon (12)
                      </label>
                    </li>
                    <li class="flex items-center">
                      <input
                        id="benq"
                        type="checkbox"
                        value=""
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                      />
                      <label
                        for="benq"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        BenQ (74)
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">
                    No
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-4 py-3">
                    <div class="flex items-center">
                      Total Price
                      <button>
                        <ChevronUpDownIcon
                          class="ml-1 h-3 w-3 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col" class="px-4 py-3">
                    <div class="flex items-center">
                      Total items
                      <a href="#">
                        <ChevronUpDownIcon
                          class="ml-1 h-3 w-3 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-4 py-3">
                    <div class="flex items-center">
                      created order
                      <a href="#">
                        <ChevronUpDownIcon
                          class="ml-1 h-3 w-3 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div class="absolute flex w-full items-center justify-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    {users.map((user, i) => {
                      const date = new Date(user.createdAt);
                      const formatDate = date.toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      });
                      return (
                        <tr class="border-b dark:border-gray-700" key={i}>
                          <th
                            scope="row"
                            class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                          >
                            {i + 1}
                          </th>
                          <td class="px-4 py-3">{user.order.name}</td>
                          <td class="px-4 py-3">{user.order.email}</td>
                          <td class="px-4 py-3">
                            {rupiah(user.order.gross_amount)}
                          </td>
                          <td class="px-4 py-3">{user.item_details.length}</td>
                          <td class="px-4 py-3">{formatDate}</td>
                          <td class="flex items-center justify-end px-4 py-3">
                            <button
                              id="apple-imac-27-dropdown-button"
                              data-dropdown-toggle="apple-imac-27-dropdown"
                              class="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                              type="button"
                            >
                              <svg
                                class="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </button>
                            <div
                              id="apple-imac-27-dropdown"
                              class="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                            >
                              <ul
                                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="apple-imac-27-dropdown-button"
                              >
                                <li>
                                  <a
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Show
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Edit
                                  </a>
                                </li>
                              </ul>
                              <div class="py-1">
                                <a
                                  href="#"
                                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="px-1 font-semibold text-gray-900">
                {totalPages.page}
              </span>
              of
              <span class="px-1 font-semibold text-gray-900">
                {totalPages.totalPages}
              </span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" />
                </button>
              </li>
              {Array.from({ length: totalPages.totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    disabled={page === index + 1}
                    class={`flex items-center justify-center border border-gray-300 ${
                      page === index + 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-gray-500"
                    }
                    px-3 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  class="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </AdminLayouts>
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <h1 className="mb-6 text-xl font-bold">Delete Product</h1>
          <p className="mb-6 font-semibold">
            Are you sure you want to delete this product?
          </p>
          <button
            className="flex gap-1 rounded-md bg-red-600 px-5 py-3 font-bold text-white"
            type="submit"
            onClick={() => handleDeleteUser(deleted._id)}
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionDashboardPage;
