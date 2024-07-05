import React, { Fragment, useEffect, useState } from "react";
import { rupiah } from "../../Hooks/useRupiah";
import { PaymentService } from "../../services/PaymentService";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/solid";

const HistoryOrder = ({ trx, formatDate, setDetails, setCancel }) => {
  const [dataPending, setDataPending] = useState({});

  const accessToken = sessionStorage.getItem("access_token");

  const handleRePayment = () => {
    setDataPending(JSON.parse(localStorage.getItem("pendingTransaction")));
  };

  PaymentService({
    history: dataPending.history,
    accessToken,
    token: dataPending.token,
    setIsLoading: () => {},
  });
  return (
    <div class="mt-6 flow-root sm:mt-8">
      <div class="divide-y-2 divide-neutral-600">
        <div class="flex flex-wrap items-end gap-4 py-6">
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="font -medium text-base text-gray-400">Order ID:</dt>
            <dd class="mt-1.5 text-xs font-semibold text-white md:text-base">
              <a href="#" class="hover:underline">
                {trx._id}
              </a>
            </dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
              Date:
            </dt>
            <dd class="mt-1.5 text-xs font-semibold text-white md:text-base">
              {formatDate}
            </dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
              Price:
            </dt>
            <dd class="mt-1.5 text-xs font-semibold text-white md:text-base">
              {rupiah(trx.order.gross_amount)}
            </dd>
          </dl>

          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
              Status:
            </dt>
            <dd
              className={`${trx.status === "settlement" ? "bg-green-900 text-green-300" : "bg-primary-900 text-primary-300"}me-2 mt-1.5 inline-flex items-center rounded  px-2.5 py-0.5 text-xs font-medium  md:text-base`}
            >
              {trx.status === "settlement" ? (
                <CheckIcon className="-mr-1 h-3 w-3" />
              ) : (
                <ClockIcon className="-ml-1 mr-1 h-3 w-3" />
              )}
              {trx.status === "settlement" ? "Success" : "Pending"}
            </dd>
          </dl>

          <div class="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
            {trx.status === "pending" && (
              <button
                type="button"
                onClick={() => setCancel(trx)}
                class="w-full rounded-lg border  border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-900 lg:w-auto"
              >
                Cancel order
              </button>
            )}
            {trx.status === "pending" ? (
              <button
                type="button"
                onClick={() => handleRePayment()}
                class="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
              >
                re-payment
              </button>
            ) : (
              <button
                onClick={() => setDetails(trx)}
                className="inline-flex w-full justify-center rounded-lg  border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-400  hover:bg-gray-700 hover:text-white  focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700 lg:w-auto"
              >
                View details
              </button>
            )}
          </div>
        </div>
      </div>
      <hr class="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-400 md:h-px md:w-full" />
    </div>
  );
};

export default HistoryOrder;
