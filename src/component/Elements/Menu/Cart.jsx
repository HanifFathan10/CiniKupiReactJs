import React from "react";

export const Cart = ({ image, title }) => {
  return (
    <div className="mb-4 rounded-md p-3 transition duration-300 hover:bg-neutral-200">
      <div className="flex items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#212121] px-3 py-4 md:h-28 md:w-28">
          <img src={image} className="aspect-auto bg-cover object-contain" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
    </div>
  );
};
