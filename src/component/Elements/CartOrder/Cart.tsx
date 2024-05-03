import * as React from "react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { AddToCart, RemoveFromCart } from "../../../services/Order.service";
import { totalItems } from "../../../Store/TotalItems";
import { useToast } from "@chakra-ui/react";
import { rupiah } from "../../../Hooks/useRupiah";
import { ItotalItems } from "../../../Interface/zustand";
import { TCart } from "../../../Types/cart";
import { Itoast } from "../../../Interface/component";

const Cart = ({ product, data, removeById }: TCart) => {
  const [click, setClick] = useState(false);
  const { useCount } = totalItems(
    useShallow((state: ItotalItems) => ({
      useCount: state.useCount,
    })),
  );

  useEffect(() => {
    if (click === true) {
      useCount();
    }
  }, [click]);

  const toast = useToast();
  const SuccessToast = ({ id, title }: Itoast) => {
    !toast.isActive(id) &&
      toast({
        id,
        title: title,
        containerStyle: {
          marginTop: "80px",
        },
        status: "success",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
  };

  const handleAddToCart = () => {
    AddToCart(data, (status, res) => {
      if (status === true) {
        setClick(true);
        const id = "add-to-cart";
        SuccessToast({
          id,
          title: res.data.message,
        });
      }
    });
  };

  const removeItem = () => {
    const _id = { _id: removeById };
    RemoveFromCart(_id, (status) => {
      status === true && useCount();
    });
  };

  const totalPrice = () => {
    return product.price && product.quantity
      ? rupiah(product.price * product.quantity)
      : 0;
  };

  return (
    <section className="flex w-full justify-center px-4 py-2">
      <div className="grid w-full max-w-lg grid-flow-col items-center justify-start gap-3 rounded-lg bg-[#ffffff] px-5 py-3 shadow-md">
        <div className="flex h-24 w-24 items-center justify-center overflow-clip rounded-full border border-[#cba258] bg-[#212121] md:h-32 md:w-32 lg:h-40 lg:w-40">
          <img src={product.image} className="w-16 md:w-24 lg:w-28" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold uppercase leading-normal sm:text-xl lg:text-2xl">
            {product.name}
          </h1>
          <h3 className="full mb-1 flex w-fit gap-1 rounded text-sm text-neutral-700 md:text-lg">
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
            <h2 className="leading-10 text-dark">{product.quantity}</h2>
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
