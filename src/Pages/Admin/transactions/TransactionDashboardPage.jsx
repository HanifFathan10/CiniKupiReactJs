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
  ChevronUpDownIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDebounce } from "use-debounce";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Pagination from "../../../component/Elements/Pagination/Pagination";

const TransactionDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState({});
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataTransaction = async () => {
      setLoading(true);

      try {
        const data = {
          page,
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
  }, [debounceSearch, page]);

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
        <div class="relative overflow-auto bg-white px-3 py-3 shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div class="flex flex-col items-center justify-between space-y-3 px-1 py-3 md:flex-row md:space-x-4 md:space-y-0">
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
                    {users.map((user, index) => {
                      const date = new Date(user.createdAt);
                      const formatDate = date.toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      });
                      const itemNumber =
                        (totalPages.currentPage - 1) * 10 + index + 1;

                      return (
                        <tr class="border-b dark:border-gray-700" key={index}>
                          <th
                            scope="row"
                            class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                          >
                            {itemNumber}
                          </th>
                          <td class="px-4 py-3">{user.order.name}</td>
                          <td class="px-4 py-3">{user.order.email}</td>
                          <td class="px-4 py-3">
                            {rupiah(user.order.gross_amount)}
                          </td>
                          <td class="px-4 py-3">{user.item_details.length}</td>
                          <td class="px-4 py-3">{formatDate}</td>
                          <td class="flex items-center justify-center px-4 py-3">
                            <Menu>
                              <MenuButton as="button">
                                <EllipsisHorizontalIcon className="h-6 w-6" />
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => setDeleted(user)}>
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </AdminLayouts>

      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <div class="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              onClick={() => setDeleted({})}
              class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
              <span class="sr-only">Close modal</span>
            </button>
            <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p class="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-600">
                {deleted.order.name}
              </span>
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                onClick={() => setDeleted({})}
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="button"
                class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => handleDeleteUser(deleted._id)}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionDashboardPage;
