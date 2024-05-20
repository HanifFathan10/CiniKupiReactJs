import React, { Fragment } from "react";
import { TotalPriceStatus } from "./TotalPriceStatus";
import { useEffect } from "react";
import { GetHistoryTransaction } from "../../../services/PaymentService";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";

export const CartStatus = () => {
  const [transaction, setTransaction] = useState([]);

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
                <h3 className="text-xs">{trx.order.order_id}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Name</h1>
                <h3 className="font-semibold">{trx.order.name}</h3>
              </div>
              <div>
                <h1 className="font-bold">Customer Email</h1>
                <h3>{trx.order.email}</h3>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-500 px-6 py-5 shadow-md shadow-slate-400">
              <TotalPriceStatus trx={trx} />
              <div className="flex justify-between">
                <h1 className="font-bold">Total</h1>
                <h1 className="font-semibold">Rp. {trx.order.gross_amount}</h1>
              </div>
            </div>
            <Divider className="my-3"></Divider>
          </section>
        );
      })}
    </Fragment>
  );
};
