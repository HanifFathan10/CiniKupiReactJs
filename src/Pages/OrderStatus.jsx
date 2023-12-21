import React from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import { CartStatus } from "../component/Elements/OrderStatus/CartStatus";

const OrderStatus = () => {
  return (
    <>
      <HeadMetaData
        title="Order Status"
        metaDescription="Order status by CiniKupi"
      />
      <section className="w-full h-screen">
        <nav className="flex items-center px-4 py-4 bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ffffff"
            className="w-6 h-6 cursor-pointer"
            onClick={() => (window.location.href = "/menu/cart")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </nav>
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
