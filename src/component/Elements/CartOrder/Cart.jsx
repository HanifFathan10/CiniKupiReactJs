import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { AddToCart, RemoveFromCart } from "../../../services/Order.service";
import { totalItems } from "../../../Store/TotalItems";
import { rupiah } from "../../../Hooks/useRupiah";
import { useOptimistic } from "../../../Hooks/useOptimistic";
import { useCustomToast } from "../../../Hooks/useToast";

const Cart = ({ product, data, removeById }) => {
  const [click, setClick] = useState(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const { useCount } = totalItems(
    useShallow((state) => ({
      useCount: state.useCount,
    })),
  );

  const [quantity, addOptimisticQuantity, revertOptimisticQuantity] =
    useOptimistic(product.quantity, (currentQuantity, newQuantity) => {
      return Math.max(0, currentQuantity + newQuantity); // Ensure quantity stays positive
    });

  useEffect(() => {
    if (click === true) {
      useCount();
    }
  }, [click]);

  const handleAddToCart = async () => {
    addOptimisticQuantity(data.quantity);

    await AddToCart(data, (status, res) => {
      if (status === true) {
        setClick(true);
        const id = "add-to-cart";
        SuccessToast({
          id,
          title: res.data.message,
        });
      } else {
        revertOptimisticQuantity();
        ErrorToast({
          id: "remove-from-cart",
          title: res.response.data.message,
        });
      }
    });
  };

  const removeItem = async () => {
    addOptimisticQuantity(-1);

    const _id = { _id: removeById };
    await RemoveFromCart(_id, (status, res) => {
      if (status === true) {
        setClick(true);
      } else {
        revertOptimisticQuantity();
      }
    });
  };

  const totalPrice = () => {
    return rupiah(product.price * product.quantity);
  };

  return (
    <section className="flex w-full justify-center px-4 py-2">
      <div className="grid w-full max-w-lg grid-flow-col items-center justify-start gap-3 rounded-lg bg-[#ffffff] px-5 py-3 shadow-md">
        <div className="flex h-24 w-24 items-center justify-center overflow-clip rounded-full border border-[#cba258] bg-[#212121] md:h-32 md:w-32 lg:h-40 lg:w-40">
          <img src={product.image} className="w-16 md:w-24 lg:w-28" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold uppercase leading-normal sm:text-lg lg:text-xl">
            {product.name}
          </h1>
          <h3 className="full sm:text-md mb-1 flex w-fit gap-1 rounded text-sm text-neutral-700 lg:text-lg">
            {totalPrice()}
          </h3>
          <div className="item-center flex gap-1 text-[#ffffff]">
            <button onClick={removeItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1f3933"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 lg:h-9 lg:w-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <h2 className="leading-10 text-black">{quantity}</h2>
            <button onClick={handleAddToCart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1f3933"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 lg:h-9 lg:w-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
