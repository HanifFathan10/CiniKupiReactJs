import React, { useState } from "react";
import { PaymentService } from "../../services/PaymentService";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/solid";
import { rupiah } from "../../utils/rupiah";

interface HistoryOrderProps {
  trx: TDataHistoryTrx;
  formatDate: string;
  setDetails: React.Dispatch<React.SetStateAction<TDataHistoryTrx>>;
  setCancel: React.Dispatch<React.SetStateAction<TDataHistoryTrx>>;
}

interface DataPending {
  history?: TDataOrder;
  token?: string;
}

const HistoryOrder = ({
  trx,
  formatDate,
  setDetails,
  setCancel,
}: HistoryOrderProps) => {
  const [dataPending, setDataPending] = useState<DataPending>({});

  const accessToken = sessionStorage.getItem("access_token")!;

  const handleRePayment = () => {
    setDataPending(JSON.parse(localStorage.getItem("pendingTransaction")!));
  };

  PaymentService({
    history: dataPending.history,
    accessToken,
    token: dataPending.token,
    setIsLoading: () => {},
  });
  return (
    <div className="mt-6 flow-root sm:mt-8">
      <div className="divide-y-2 divide-neutral-600">
        <div className="flex flex-wrap items-end gap-4 py-6">
          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="font -medium text-base text-gray-300">Order ID:</dt>
            <dd className="mt-1.5 text-xs font-semibold text-white md:text-base">
              <span className="cursor-pointer hover:underline">{trx._id}</span>
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-300">Date:</dt>
            <dd className="mt-1.5 text-xs font-semibold text-white md:text-base">
              {formatDate}
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-300">Price:</dt>
            <dd className="mt-1.5 text-xs font-semibold text-white md:text-base">
              {rupiah(trx.order!.gross_amount!)}
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt className="text-base font-medium text-gray-300">Status:</dt>
            <dd
              className={`${trx.status === "settlement" ? "bg-green-900 text-green-300" : "bg-primary-900 text-primary-300"}me-2 mt-1.5 inline-flex items-center rounded  px-2.5 py-0.5 text-xs font-medium  md:text-base`}
            >
              {trx.status === "settlement" ? (
                <CheckIcon className="-ml-1 mr-1 h-3 w-3" />
              ) : (
                <ClockIcon className="-ml-1 mr-1 h-3 w-3" />
              )}
              {trx.status === "settlement" ? "Success" : "Pending"}
            </dd>
          </dl>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
            {trx.status === "pending" && (
              <button
                type="button"
                onClick={() => setCancel(trx)}
                className="w-full rounded-lg border  border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-900 lg:w-auto"
              >
                Cancel order
              </button>
            )}
            {trx.status === "pending" ? (
              <button
                type="button"
                onClick={() => handleRePayment()}
                className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:w-auto"
              >
                re-payment
              </button>
            ) : (
              <button
                onClick={() => setDetails(trx)}
                className="inline-flex w-full justify-center rounded-lg border border-gray-200 bg-gray-600 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 lg:w-auto"
              >
                View details
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-400 md:h-px md:w-full" />
    </div>
  );
};

export default HistoryOrder;
