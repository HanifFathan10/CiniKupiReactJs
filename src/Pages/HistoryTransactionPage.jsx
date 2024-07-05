import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HistoryOrder from "../component/Fragment/HistoryOrder";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import {
  DeleteHistoryTransaction,
  GetHistoryTransaction,
} from "../services/PaymentService";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ModalInput from "../component/Elements/InputForm/Modal";
import { rupiah } from "../Hooks/useRupiah";
import useFormatDate from "../Hooks/useFormatDate";
import Pagination from "../component/Elements/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { Skeleton, Stack } from "@chakra-ui/react";

const HistoryTransactionPage = () => {
  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cancel, setCancel] = useState({});
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const location = useLocation();

  const dataPending = JSON.parse(localStorage.getItem("pendingTransaction"));

  useEffect(() => {
    setIsLoading(true);
    const fetchDataTransaction = async () => {
      const data = {
        page,
        limit: 5,
        status,
        time,
      };
      await GetHistoryTransaction((status, res) => {
        if (status) {
          setTransaction(res.data.data);
          setTotalPages(res.data);
          setIsLoading(false);
        }
      }, data);
    };

    fetchDataTransaction();
  }, [page, status, time, location]);

  const formatDateDetails = useFormatDate(details.createdAt, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setPage(1);
  };

  const handleCancelTransaction = async (order_id) => {
    await DeleteHistoryTransaction(order_id, (status, res) => {
      if (status) {
        localStorage.removeItem("pendingTransaction");
        setCancel({});
      }
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search);
    const statusCode = searchParams.get("status_code");

    if (statusCode == "200") {
      handleCancelTransaction(dataPending?.history.order.order_id);
      localStorage.removeItem("pendingTransaction");
    }

    return;
  }, [location]);

  return (
    <React.Fragment>
      <HeadMetaData
        title="Order Status"
        metaDescription="Order status by CiniKupi"
      />
      <AuthLayouth>
        <section class="mx-auto mt-20 h-full w-full max-w-7xl rounded-md bg-slate-900 py-6 antialiased">
          <div class="mx-auto px-4">
            <div class="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 class="text-xl font-semibold text-white sm:text-2xl">
                My orders
              </h2>

              <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label
                    for="order-type"
                    class="white sr-only mb-2 block text-sm font-medium"
                  >
                    Select order type
                  </label>
                  <select
                    id="order-type"
                    onChange={handleStatusChange}
                    value={status}
                    class="block w-full min-w-[8rem] rounded-lg border border-gray-600  bg-gray-700 p-2.5 text-sm text-white placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option selected value="">
                      All orders
                    </option>
                    <option value="settlement">Success</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <span class="inline-block text-gray-500 dark:text-gray-400">
                  {" "}
                  from{" "}
                </span>

                <div>
                  <label
                    for="duration"
                    class="sr-only mb-2 block text-sm font-medium text-white"
                  >
                    Select duration
                  </label>
                  <select
                    id="duration"
                    onChange={handleTimeChange}
                    value={time}
                    class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  text-white placeholder:text-gray-400  focus:border-primary-500  focus:ring-primary-500"
                  >
                    <option selected value="">
                      All time
                    </option>
                    <option value="3days">the last 3 days</option>
                    <option value="1week">the last 1 Weeks</option>
                    <option value="1months">the last 1 months</option>
                    <option value="3months">the last 3 months</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-16 grid grid-cols-1 gap-4 place-self-end md:grid-cols-4">
                <div className="flex flex-col gap-3">
                  <Skeleton height="20px" />
                  <Skeleton height="25px" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton height="20px" />
                  <Skeleton height="25px" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton height="20px" />
                  <Skeleton height="25px" />
                </div>
                <div className="flex flex-col justify-end">
                  <Skeleton height="25px" />
                </div>
              </div>
            ) : (
              <React.Suspense>
                {transaction.map((trx, i) => {
                  const date = new Date(trx.createdAt);
                  const formatDate = date.toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <HistoryOrder
                      trx={trx}
                      formatDate={formatDate}
                      i={i}
                      setDetails={setDetails}
                      setCancel={setCancel}
                      key={i}
                    />
                  );
                })}
              </React.Suspense>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </section>
      </AuthLayouth>

      {Object.keys(details).length ? (
        <ModalInput onClose={() => setDetails({})}>
          <div class="dark:bg-gray-800:p-5 relative rounded-lg bg-white p-4 shadow">
            <div class=" flex items-end justify-between rounded-t">
              <h1 className="text-xl font-semibold">Detail Order</h1>
              <div>
                <button
                  type="button"
                  class="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setDetails({})}
                >
                  <XMarkIcon class="h-6 w-6" />
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <hr class="my-4 h-px rounded-md border-0 bg-gray-400" />
            <dl>
              <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Name
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {details.order.name}
                  </dd>
                </div>
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Email
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {details.order.email}
                  </dd>
                </div>
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Phone
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {details.order.phone}
                  </dd>
                </div>
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Adress
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {details.order.address}
                  </dd>
                </div>
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Total Price
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {rupiah(details.order.gross_amount)}
                  </dd>
                </div>
                <div>
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Time Order
                  </dt>
                  <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                    {formatDateDetails}
                  </dd>
                </div>
              </div>

              <h2 className="mb-4 font-semibold text-gray-900">Total Items</h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.item_details.map((item, i) => (
                  <div
                    className="grid grid-cols-1 gap-y-4 rounded-lg border border-gray-200 bg-gray-100 p-3 font-semibold text-gray-800 sm:grid-cols-2"
                    key={i}
                  >
                    <div>
                      <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Product Name
                      </dt>
                      <dd class=" font-light text-gray-500 dark:text-gray-400">
                        {item.name}
                      </dd>
                    </div>

                    <div>
                      <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Price
                      </dt>
                      <dd class=" font-light text-gray-500 dark:text-gray-400">
                        {rupiah(item.price)}
                      </dd>
                    </div>
                    <div>
                      <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Quantity
                      </dt>
                      <dd class=" font-light text-gray-500 dark:text-gray-400">
                        {item.quantity}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </dl>
          </div>
        </ModalInput>
      ) : null}
      {Object.keys(cancel).length ? (
        <ModalInput onClose={() => setCancel({})}>
          <div class="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              onClick={() => setCancel({})}
              class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
              <span class="sr-only">Close modal</span>
            </button>
            <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p class="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-600"></span>
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                onClick={() => setCancel({})}
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => handleCancelTransaction(cancel.order.order_id)}
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

export default HistoryTransactionPage;
