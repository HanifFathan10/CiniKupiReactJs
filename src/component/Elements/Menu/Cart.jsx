import React from "react";

export const Cart = ({ image, title }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center px-3 py-4 rounded-full bg-[#212121] h-24 w-24 md:h-28 md:w-28 overflow-hidden">
          <img src={image} className="bg-cover object-contain aspect-auto" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
    </div>
  );
};
