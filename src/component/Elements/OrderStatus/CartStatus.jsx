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
          <section key={i}>
            <div className="mb-3 flex w-full flex-col gap-3 rounded-lg border border-slate-500 bg-secondary px-6 py-5 shadow-md shadow-slate-600 sm:max-w-lg">
              <div>
                <h1 className="font-bold">Transaction ID</h1>
                <h3 className="text-xs">{trx.transaction_details.order_id}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Name</h1>
                <h3 className="font-semibold">{trx.customer_details.name}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Email</h1>
                <h3>{trx.customer_details.email}</h3>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-500 px-6 py-5 shadow-md shadow-slate-400 sm:max-w-lg">
              <TotalPriceStatus trx={trx} />
              <div className="flex justify-between">
                <h1 className="font-bold">Total</h1>
                <h1 className="font-semibold">
                  Rp. {trx.transaction_details.gross_amount}
                </h1>
              </div>
            </div>
            <br />
          </section>
        );
      })}
    </Fragment>
  );
};
