import React from "react";

interface CartProps {
  image: string | undefined;
  title: string | undefined;
}

export const Cart = ({ image, title }: CartProps) => {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-md border-solid p-4 transition duration-300 ease-in-out hover:translate-y-1 hover:shadow hover:outline hover:outline-teriary">
      <img
        src={image}
        className="aspect-auto h-24 w-24 bg-cover object-contain md:h-28 md:w-28"
        width={50}
        height={50}
        loading="lazy"
      />
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
  );
};
