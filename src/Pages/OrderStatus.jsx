import React from "react";
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
      <section className="w-full h-screen">
        <HeaderBack title="Detail Transaction" />
        <main className="w-full flex flex-col justify-center items-center px-4">
          <div className="my-3">
            <h1 className="font-bold text-lg">HISTORY TRANSACTION</h1>
          </div>
          <CartStatus />
        </main>
      </section>
    </>
  );
};

export default OrderStatus;
