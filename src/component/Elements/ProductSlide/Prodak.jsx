import React, { useState } from "react";
import { Link } from "react-router-dom";

const Prodak = ({ name, price, image, alt, _id }) => {
  return (
    <div className="bg-gradient-to-t from-neutral-300 to-zinc-600 rounded-md p-4 mx-4 h-full flex flex-wrap justify-center content-between">
      <div className="pb-4">
        <img src={image} alt={alt} className="rounded-ss-lg rounded-br-xl w-[230px] object-cover" />
      </div>
      <div className="flex flex-col justify-center w-full items-center">
        <Link to={`/${_id}`} className="flex-none font-bold text-lg sm:text-sm">{name}</Link>
        <h3 className="text-xs italic">Rp{" "}{price}</h3>
      </div>
    </div>
  );
};

export default Prodak;
