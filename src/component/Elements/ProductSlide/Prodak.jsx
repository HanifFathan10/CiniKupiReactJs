import React from "react";

const Prodak = () => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-slate-700 rounded-md p-4 mx-4">
      <div className="flex justify-center pb-3">
        <img src="https://source.unsplash.com/200x200" alt="cinikupi1" className="rounded-ss-lg rounded-br-xl" />
      </div>
      <h2 className="font-bold text-xl italic ml-6">coffe latte</h2>
      <p className="text-[10px] sm:text-xs ml-6">some about description, you can click here...</p>
      <button className="text-xs font-semibold sm:text-sm bg-teal-400 ml-6 mt-4 rounded-md px-2 py-1">add to cart</button>
    </div>
  );
};

export default Prodak;