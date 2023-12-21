import React, { Fragment } from "react";
import { Payment } from "../../../Store/Payment";
import { useShallow } from "zustand/react/shallow";
import { TotalPriceStatus } from "./TotalPriceStatus";

export const CartStatus = () => {
  const transaction = Payment(useShallow((state) => state.transaction));
  return (
    <Fragment>
      {transaction.map((trx, i) => {
        return (
          <>
            <div
              className="flex flex-col w-full sm:max-w-lg border border-slate-500 rounded-lg px-6 py-5 gap-3 mb-3 bg-secondary shadow-md shadow-slate-600"
              key={i}
            >
              <div>
                <h1 className="font-bold">Transaction ID</h1>
                <h3 className="text-xs">{trx.transaction_details.order_id}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Name</h1>
                <h3 className="font-semibold">
                  {trx.customer_details.first_name}
                </h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Email</h1>
                <h3>{trx.customer_details.email}</h3>
              </div>
            </div>
            <div className="flex flex-col w-full sm:max-w-lg border border-slate-500 rounded-lg px-6 py-5 gap-3 shadow-md shadow-slate-400">
              <TotalPriceStatus trx={trx} />
              <div className="flex justify-between">
                <h1 className="font-bold">Total</h1>
                <h1 className="font-semibold">
                  Rp. {trx.transaction_details.gross_amount}
                </h1>
              </div>
            </div>
            <br />
          </>
        );
      })}
    </Fragment>
  );
};
