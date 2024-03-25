import React from "react";
import Footer from "../../component/Elements/Footer/Footer";
import { addToCart } from "../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import ListOrder from "../../component/Fragment/ListOrder";
import NavCart from "../../component/Elements/CartOrder/NavCart";
import FormCheckout from "../../component/Fragment/FormCheckout";

const CartProduct = () => {
  const cartItems = addToCart(useShallow((state) => state.cartItems));
  const count = cartItems.length;

  return (
    <>
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
          <ListOrder count={count} />
          <FormCheckout />
          <Footer />
        </div>
      </section>
    </>
  );
};

export default CartProduct;
