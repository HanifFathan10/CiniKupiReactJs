import React from "react";
import { addToCart } from "../../../Store/AddToCart";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const PopUpOrder = () => {
  const cartItems = addToCart(useShallow((state) => Object.keys(state.cartItems)));
  const count = cartItems.length;
  return (
    <Link to={"/menu/cart"} className="fixed w-full bg-[#1f3933] h-[4.6rem] right-0 bottom-0 z-[9999]">
      <div className="relative container top-4 right-4 flex justify-end items-center">
        <div className="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#00A862" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <h1 className="absolute mt-4 text-[#ffffff] font-bold">{count}</h1>
        </div>
      </div>
    </Link>
  );
};

export default PopUpOrder;
