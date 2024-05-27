import React from "react";
import Footer from "../../component/Elements/Footer/Footer";
import { useShallow } from "zustand/react/shallow";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import ListOrder from "../../component/Fragment/ListOrder";
import NavCart from "../../component/Elements/CartOrder/NavCart";
import FormCheckout from "../../component/Fragment/FormCheckout";
import { totalItems } from "../../Store/TotalItems";

const CartProduct = () => {
  const count = totalItems(useShallow((state) => state.count));

  return (
    <React.Fragment>
      <HeadMetaData title="Order" metaDescription="Order page by CiniKupi" />
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="w-full bg-[#1f3933] text-[#ffffff]">
          <div className="px-2 py-4 md:fixed md:h-screen md:px-6">
            <NavCart />
            <div className="flex h-full w-full items-center px-3 py-4">
              <div className="flex">
                <h1 className="text-2xl font-bold">Review Order ({count})</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ListOrder />
          <FormCheckout />
          <Footer />
        </div>
      </section>
    </React.Fragment>
  );
};

export default CartProduct;
