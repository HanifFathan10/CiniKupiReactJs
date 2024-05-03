import * as React from "react";
import { Fragment } from "react";
import TotalPriceStatus from "./TotalPriceStatus";
import { useEffect } from "react";
import { GetHistoryTransaction } from "../../../services/PaymentService";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
import { IhistoryOrders } from "../../../Types/historyOrders";

export const CartStatus = () => {
  const [transaction, setTransaction] = useState<IhistoryOrders[]>([]);

  useEffect(() => {
    GetHistoryTransaction((status, res) => {
      if (status) {
        setTransaction(res.data);
      }
    });
  }, []);

  return (
    <Fragment>
      {transaction.reverse().map((trx, i) => {
        return (
          <section key={i} className="w-full md:max-w-4xl">
            <div className="mb-3 flex w-full flex-col gap-3 rounded-lg border border-slate-500 bg-secondary px-6 py-5 shadow-md shadow-slate-600">
              <div>
                <h1 className="font-bold">Transaction ID</h1>
                <h3 className="text-xs">{trx.orders.order_id}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Name</h1>
                <h3 className="font-semibold">{trx.orders.name}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Email</h1>
                <h3>{trx.orders.email}</h3>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-500 px-6 py-5 shadow-md shadow-slate-400">
              <TotalPriceStatus trx={trx.item_details} />
              <div className="flex justify-between">
                <h1 className="font-bold">Total</h1>
                <h1 className="font-semibold">Rp. {trx.orders.gross_amount}</h1>
              </div>
            </div>
            <Divider className="my-3"></Divider>
          </section>
        );
      })}
    </Fragment>
  );
};
