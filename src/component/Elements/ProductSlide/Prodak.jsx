import React from "react";

const Prodak = ({ name, price, image, alt }) => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-slate-700 rounded-md p-4 mx-4 h-full flex flex-wrap justify-center content-between">
      <div className="pb-3">
        <img src={image} alt={alt} className="rounded-ss-lg rounded-br-xl max-w-[200px]" />
      </div>
      <div>
        <h2 className="font-bold text-xl ml-6">{name}</h2>
        <p className="text-[10px] sm:text-xs ml-6">
          some about description, you can click{" "}
          <a href="#!" className="text-slate-900">
            here...
          </a>
        </p>
        <p className="text-sm sm:text-md font-semibold ml-6">{price}</p>
      </div>
    </div>
  );
};

export default Prodak;
