import React from "react";

const Prodak = ({ name, price, image, alt, _id }) => {
  const Navigate = () => {
    window.location.href = `/product/${_id}`
  }
  return (
    <div className="flex justify-center items-center px-6 md:px-0 py-9 mx-auto">
      <div className="max-w-[280px] grid grid-cols-2 place-content-center place-items-center rounded-xl p-4 bg-gradient-to-b from-[#1f3933] to-[#cba258]">
        <button onClick={Navigate} className="w-32 md:w-36 h-40 md:h-40 flex justify-center items-center overflow-hidden">
          <img src={image} alt={alt} className="bg-cover w-24" />
        </button>
        <div className="px-4 text-[#eaeaea]">
          <h1 className="font-bold text-xl mb-2 uppercase leading-none">{name}</h1>
          <h3 className="line-lamp-3 font-semibold text-xs">Rp. {price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Prodak;
