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
    ])
  );
  const toast = useToast();

  const handleAddToCart = () => {
    const lengthItems = cartItems[0].quantity === 8;
    const id = "max-order";
    lengthItems
      ? !toast.isActive(id) &&
        toast({
          id,
          title: "Maximum order is 8 items. Please adjust your order.",
          containerStyle: {
            fontSize: "12px",
          },
          status: "error",
          position: "bottom-left",
          isClosable: true,
        })
      : updateQty(qty);
  };
  return (
    <section className="flex px-4 py-2 w-full justify-center">
      <div className="grid grid-flow-col w-full max-w-lg items-center justify-start gap-3 px-5 py-3 shadow-md rounded-lg bg-[#ffffff]">
        <div className="bg-[#212121] h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border border-[#cba258] overflow-clip flex items-center justify-center">
          <img src={product.image} className="w-16 md:w-24 lg:w-28" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg sm:text-xl lg:text-2xl leading-normal uppercase">
            {product.name}
          </h1>
          <div className="w-fit rounded full md:text-lg flex gap-1 mb-1 text-sm text-[#cba258]">
            <h1>200</h1>
            <h1>Items</h1>
          </div>
          <div className="flex gap-1 item-center text-[#ffffff]">
            <button onClick={() => removeFromCart(removeById)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1f3933"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 lg:w-9 lg:h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <h1 className="text-dark mt-[5px]">{product.quantity}</h1>
            <button onClick={() => handleAddToCart()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1f3933"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 lg:w-9 lg:h-9"
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
