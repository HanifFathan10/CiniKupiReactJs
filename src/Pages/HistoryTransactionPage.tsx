import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HistoryOrder from "../component/Fragment/HistoryOrder";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import { DeleteHistoryTransactionByOrderId } from "../services/payment.service";
import Pagination from "../component/Elements/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import Details from "../component/Elements/Modal/history/Details";
import Cancel from "../component/Elements/Modal/history/Cancel";
import useHistoryTrxStore from "../Store/HistoryTrx";
import SortOrder from "../component/Fragment/SortOrder";

const HistoryTransactionPage = () => {
  const [page, setPage] = useState<number>(1);
  const [cancel, setCancel] = useState<AllDataTransaction>(
    {} as AllDataTransaction,
  );
  const [details, setDetails] = useState<AllDataTransaction>(
    {} as AllDataTransaction,
  );

  const location = useLocation();
  const [historyTrx, currentPage, totalPage, isLoading] = useHistoryTrxStore(
    (state) => [
      state.historyTrx,
      state.currentPage,
      state.totalPage,
      state.isLoading,
    ],
  );

  const dataPending = JSON.parse(localStorage.getItem("pendingTransaction")!);
  const paginate: Pagination = {
    current_page: currentPage,
    total_pages: totalPage,
  };

  const handleCancelTransaction = async (order_id: string) => {
    await DeleteHistoryTransactionByOrderId(order_id, (status, res) => {
      if (status) {
        setCancel({} as AllDataTransaction);
        localStorage.removeItem("pendingTransaction");
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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

              <SortOrder page={page} setPage={setPage} />
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
                  historyTrx.map((trx: AllDataTransaction, i: number) => {
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
