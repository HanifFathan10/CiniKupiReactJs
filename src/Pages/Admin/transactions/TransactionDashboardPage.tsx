import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { GetAllHistoryTransaction } from "../../../services/Payment.service";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useDebounce } from "use-debounce";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Pagination from "../../../component/Elements/Pagination/Pagination";
import useSearchTrim from "../../../Hooks/useSearchTrim";
import { rupiah } from "../../../utils/rupiah";
import Delete from "../../../component/Elements/Modal/admin/user/Delete";
import Datepicker from "react-tailwindcss-datepicker";

const TransactionDashboardPage = () => {
  const [page, setPage] = useState<number>(1);
  const [deleted, setDeleted] = useState<AllDataTransaction>(
    {} as AllDataTransaction,
  );
  const [totalPages, setTotalPages] = useState<Pagination>({} as Pagination);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [transaction, setTransaction] = useState<AllDataTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { trimSearch, setTrimSearch, trimmedValue, handleSubmitChange } =
    useSearchTrim();
  const [debounceSearch] = useDebounce(trimmedValue, 1500);

  const fetchTransactionData = async () => {
    const data: TQueryParamsHistoryTrx = {
      page,
      search: debounceSearch,
      sortKey: sortConfig.key,
      sortDirection: sortConfig.direction,
      startDate: date.startDate!,
      endDate: date.endDate!,
      limit: 10,
      status: "",
      time: "",
    };

    await GetAllHistoryTransaction((status, res) => {
      if (status === true) {
        setTransaction(res.data);
        setTotalPages(res);
        setLoading(false);
      }
    }, data);
  };

  useEffect(() => {
    const fetchDataTransaction = () => {
      setLoading(true);

      try {
        fetchTransactionData();
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDataTransaction();
  }, [debounceSearch, page, sortConfig, date]);

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUpIcon className="ml-1 h-3 w-3 flex-shrink-0 text-gray-400" />
      ) : (
        <ChevronDownIcon className="ml-1 h-3 w-3 flex-shrink-0 text-gray-400" />
      );
    }
    return (
      <ChevronUpDownIcon className="ml-1 h-3 w-3 flex-shrink-0 text-gray-400" />
    );
  };

  const handleSearchTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrimSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDate = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <React.Fragment>
      <HeadMetaData
        title="transaction Dashboard"
        metaDescription="transaction dashboard"
      />
      <AdminLayouts>
        <div className="relative flex h-full flex-col justify-between overflow-auto bg-white px-3 py-3 shadow-md  sm:rounded-lg">
          <div>
            <div className="flex flex-col items-center justify-between space-y-3 px-1 py-3 md:flex-row md:space-x-4 md:space-y-0">
              <div className="w-full md:w-96">
                <form
                  className="flex items-center"
                  onSubmit={handleSubmitChange}
                >
                  <label htmlFor="search-transaction" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 " />
                    </div>
                    <input
                      type="text"
                      id="search-transaction"
                      value={trimSearch}
                      onChange={handleSearchTransaction}
                      className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900"
                      placeholder="Search by name or email"
                      required
                    />
                  </div>
                </form>
              </div>
              <Datepicker
                containerClassName="relative w-full md:w-96 text-gray-700"
                inputClassName="relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-green-500 focus:ring-green-500/20"
                toggleClassName="absolute bg-primary rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                i18n="id"
                value={date}
                onChange={handleDate}
                showShortcuts={true}
                separator="~"
                primaryColor="teal"
                useRange={false}
                showFooter={true}
                placeholder="YYYY-MM-DD to YYYY-MM-DD"
                configs={{
                  footer: {
                    apply: "Apply",
                    cancel: "Cancel",
                  },
                }}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 ">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      No
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer px-4 py-3"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {getIcon("name")}
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>

                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">Total items</div>
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer px-4 py-3"
                      onClick={() => handleSort("gross_amount")}
                    >
                      <div className="flex items-center">
                        Total Price
                        {getIcon("gross_amount")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="cursor-pointer px-4 py-3"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Created Order
                        {getIcon("createdAt")}
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="absolute flex w-full items-center justify-center">
                      <td role="status">
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 "
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
                        <span className="sr-only">Loading...</span>
                      </td>
                    </tr>
                  ) : (
                    <React.Fragment>
                      {transaction.map((trx, index) => {
                        const date = new Date(trx.createdAt!);
                        const formatDate = date.toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        });
                        const itemNumber =
                          (totalPages.current_page! - 1) * 10 + index + 1;

                        return (
                          <tr className="border-b" key={index}>
                            <td
                              scope="row"
                              className="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
                            >
                              {itemNumber}
                            </td>
                            <td className="px-4 py-3">
                              {trx.customer_detail?.name}
                            </td>
                            <td className="px-4 py-3">
                              {trx.customer_detail?.email}
                            </td>

                            <td className="px-4 py-3">
                              {trx.item_details?.length}
                            </td>
                            <td className="px-4 py-3">
                              {rupiah(trx.customer_detail?.gross_amount)}
                            </td>
                            <td className="px-4 py-3">{formatDate}</td>
                            <td className="flex items-center justify-center px-4 py-3">
                              <Menu>
                                <MenuButton as="button">
                                  <EllipsisHorizontalIcon className="h-6 w-6" />
                                </MenuButton>
                                <MenuList>
                                  <MenuItem onClick={() => setDeleted(trx)}>
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
          </div>
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            paginate={totalPages}
          />
        </div>
      </AdminLayouts>

      <Delete
        deleted={deleted}
        setDeleted={setDeleted}
        fetchData={fetchTransactionData}
        key={Math.random()}
      />
    </React.Fragment>
  );
};

export default TransactionDashboardPage;
