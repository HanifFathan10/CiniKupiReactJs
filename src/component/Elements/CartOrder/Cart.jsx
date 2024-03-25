import React from "react";
import { addToCart } from "../../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import { useToast } from "@chakra-ui/react";

const Cart = ({ product, qty, removeById }) => {
  const [removeFromCart, updateQty, cartItems] = addToCart(
    useShallow((state) => [
      state.removeFromCart,
      state.addToCart,
      state.cartItems,
    ]),
  );
  const toast = useToast();

  const handleAddToCart = () => {
    const isEveryItemQuantityEight = cartItems.every(
      (item) => item.quantity === 8,
    );
    const id = "max-order";
    isEveryItemQuantityEight
      ? !toast.isActive(id) &&
        toast({
          id,
          title: "Maximum order is 8 items. Please adjust your order.",
          containerStyle: {
            marginTop: "80px",
            fontSize: "12px",
          },
          status: "error",
          position: "top",
          isClosable: true,
        })
      : updateQty(qty);
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
          <div className="full mb-1 flex w-fit gap-1 rounded text-sm text-[#cba258] md:text-lg">
            <h1>200</h1>
            <h1>Items</h1>
          </div>
          <div className="item-center flex gap-1 text-[#ffffff]">
            <button onClick={() => removeFromCart(removeById)}>
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
            <button onClick={() => handleAddToCart()}>
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
