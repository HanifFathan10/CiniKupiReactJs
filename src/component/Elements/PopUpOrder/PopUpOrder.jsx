import React from "react";
import { addToCart } from "../../../Store/AddToCart";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const PopUpOrder = () => {
  const cartItems = addToCart(
    useShallow((state) => Object.keys(state.cartItems)),
  );
  const count = cartItems.length;
  return (
    <div className="fixed bottom-0 right-0 z-[9999] h-[4.6rem] w-full bg-transparent">
      <div className="container relative right-4 top-4 flex items-center justify-end">
        <Link className="flex items-center justify-center" to={"/menu/cart"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#00A862"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h1 className="absolute mt-4 font-bold text-[#ffffff]">{count}</h1>
        </Link>
      </div>
    </div>
  );
};

export default PopUpOrder;
