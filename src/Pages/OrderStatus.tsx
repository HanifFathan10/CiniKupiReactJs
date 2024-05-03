import * as React from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import { CartStatus } from "../component/Elements/OrderStatus/CartStatus";
import HeaderBack from "../component/Elements/HeaderBack";

const OrderStatus = () => {
  return (
    <>
      <HeadMetaData
        title="Order Status"
        metaDescription="Order status by CiniKupi"
      />
      <section className="h-screen w-full">
        <HeaderBack title="Detail Transaction" />
        <main className="flex w-full flex-col items-center justify-center px-4">
          <div className="my-3">
            <h1 className="text-lg font-bold">HISTORY TRANSACTION</h1>
          </div>
          <CartStatus />
        </main>
      </section>
    </>
  );
};

export default OrderStatus;
