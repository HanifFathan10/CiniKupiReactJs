import React from "react";
import { useNavigate } from "react-router-dom";
import Star from "../Icon/Star";

const NoProductUI = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col px-4 max-w-sm md:max-w-lg gap-4">
      <Star />
      <h1 className="font-semibold text-4xl">Start your next order</h1>
      <h3 className="font-extralight text-lg">
        As you add menu items, they'll appear here. You'll have a chance to
        review before placing your order.
      </h3>
      <button
        className="w-32 h-12 rounded-full border border-[#cba258]"
        onClick={() => Navigate("/menu")}
      >
        Add Items
      </button>
    </div>
  );
};

export default NoProductUI;
