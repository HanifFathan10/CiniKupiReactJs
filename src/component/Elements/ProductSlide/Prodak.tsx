import React from "react";
import { useNavigate } from "react-router-dom";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import { rupiah } from "../../../utils/rupiah";

const Prodak = ({ name, price, image, _id }: TDataSingleProduct) => {
  const navigate = useNavigate();
  const Navigate = () => {
    navigate(`/product/${_id}`);
    useScrollTop;
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-9 md:px-0">
      <button
        onClick={Navigate}
        className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-teriary bg-secondary md:h-52 md:w-52"
      >
        <img
          src={image}
          alt={name}
          className="w-[132px] bg-cover bg-center p-2"
        />
      </button>
      <div className="flex max-w-xs flex-col">
        <div className="px-4 text-white/90">
          <h1 className="mb-2 text-xl font-bold uppercase leading-none">
            {name}
          </h1>
          <h3 className="line-lamp-3 text-xs font-semibold">{rupiah(price)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Prodak;
