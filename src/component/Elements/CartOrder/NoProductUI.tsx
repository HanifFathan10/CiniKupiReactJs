import React from "react";
import { useNavigate } from "react-router-dom";
import Star from "../Icon/Star";

const NoProductUI = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex max-w-sm flex-col gap-4 px-4 md:max-w-lg">
      <Star />
      <h1 className="text-4xl font-semibold">Start your next order</h1>
      <h3 className="text-lg font-extralight">
        As you add menu items, they'll appear here. You'll have a chance to
        review before placing your order.
      </h3>
      <button
        className="h-12 w-32 rounded-full border border-[#cba258]"
        onClick={() => Navigate("/menu")}
      >
        Add Items
      </button>
    </div>
  );
};

export default NoProductUI;
