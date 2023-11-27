import React from "react";

const Prodak = ({ name, price, image, alt, _id }) => {
  const Navigate = () => {
    window.location.href = `/product/${_id}`;
  };
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl px-6 md:px-0 py-9 mx-auto gap-4">
      <button onClick={Navigate} className="bg-[#212121] h-40 w-40 md:w-52 md:h-52 rounded-full border border-[#cba258] overflow-hidden flex items-center justify-center">
        <img src={image} alt={alt} className="w-[132px] bg-cover bg-center p-2" />
      </button>
      <div className="max-w-xs flex flex-col">
        <div className="px-4 text-[#eaeaea]">
          <h1 className="font-bold text-xl mb-2 uppercase leading-none">{name}</h1>
          <h3 className="line-lamp-3 font-semibold text-xs">Rp. {price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Prodak;
