import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HistoryOrder from "../component/Fragment/HistoryOrder";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import { DeleteHistoryTransactionByOrderId } from "../services/Payment.service";
import Pagination from "../component/Elements/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import Details from "../component/Elements/Modal/history/Details";
import Cancel from "../component/Elements/Modal/history/Cancel";
import useHistoryTrxStore from "../Store/HistoryTrx";

const HistoryTransactionPage = () => {
  const [status, setStatus] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [cancel, setCancel] = useState<TDataHistoryTrx>({});
  const [details, setDetails] = useState<TDataHistoryTrx>({});

  const location = useLocation();
  const [historyTrx, getHistoryTrx, currentPage, totalPage, isLoading] =
    useHistoryTrxStore((state) => [
      state.historyTrx,
      state.getHistoryTrx,
      state.currentPage,
      state.totalPage,
      state.isLoading,
    ]);

  const dataPending = JSON.parse(localStorage.getItem("pendingTransaction")!);
  const paginate = { current_page: currentPage, total_page: totalPage };

  useEffect(() => {
    const data: TQueryParamsHistoryTrx = {
      limit: 10,
      status,
      time,
    };
    getHistoryTrx(data);
  }, [page, status, time, location]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setStatus(e.target.value);
    setPage(1);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setTime(e.target.value);
    setPage(1);
  };

  const handleCancelTransaction = async (order_id: string) => {
    await DeleteHistoryTransactionByOrderId(order_id, (status, res) => {
      if (status) {
        setCancel({});
        localStorage.removeItem("pendingTransaction");
      }
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search);
    const statusCode = searchParams.get("status_code");

    if (statusCode == "200") {
      handleCancelTransaction(
        dataPending?.history.transaction_details.order_id,
      );
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
        <section className="flex min-h-screen flex-col justify-between bg-primary py-6 pt-24 text-white antialiased">
          <div className="px-4">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                My orders
              </h2>

              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label
                    htmlFor="order-type"
                    className="white sr-only mb-2 block text-sm font-medium"
                  >
                    Select order type
                  </label>
                  <select
                    id="order-type"
                    onChange={handleStatusChange}
                    value={status}
                    name="order-type"
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full min-w-[8rem] rounded-lg  border border-neutral-400 bg-neutral-600 p-2.5 text-sm text-white placeholder:text-gray-400"
                  >
                    <option value="">All orders</option>
                    <option value="settlement">Success</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <span className="inline-block font-medium text-neutral-200">
                  {" "}
                  from{" "}
                </span>

                <div>
                  <label
                    htmlFor="duration"
                    className="sr-only mb-2 block text-sm font-medium text-white"
                  >
                    Select duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    onChange={handleTimeChange}
                    value={time}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg  border border-neutral-400 bg-neutral-600 p-2.5 text-sm text-white placeholder:text-gray-400"
                  >
                    <option value="">All time</option>
                    <option value="3days">the last 3 days</option>
                    <option value="1week">the last 1 Weeks</option>
                    <option value="1months">the last 1 months</option>
                    <option value="3months">the last 3 months</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <>
                {[1, 2, 3].map((i, index) => (
                  <div
                    className="mt-16 grid grid-cols-1 gap-4 place-self-end md:grid-cols-4"
                    key={index}
                  >
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
                ))}
              </>
            ) : (
              <React.Fragment>
                {historyTrx.length > 0 ? (
                  historyTrx.map((trx: TDataHistoryTrx, i: number) => {
                    const date = new Date(trx.createdAt!);
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
                        setDetails={setDetails}
                        setCancel={setCancel}
                        key={i}
                      />
                    );
                  })
                ) : (
                  <>
                    <h1 className="text-center text-xl font-medium">
                      Belum ada transaksi...
                    </h1>
                  </>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="px-3">
            <Pagination
              page={page}
              paginate={paginate}
              handlePageChange={handlePageChange}
            />
          </div>
        </section>
      </AuthLayouth>

      <Details details={details} setDetails={setDetails} key={Math.random()} />
      <Cancel cancel={cancel} setCancel={setCancel} key={Math.random()} />
    </React.Fragment>
  );
};

export default HistoryTransactionPage;
