import React from "react";
import ListItems from "./ListItems/ListItems";
import ListImageCoffe from "./ListImages/ListImageCoffe";

const ProductCoffe = ({ title }) => {
  return (
    <div className="flex bg-slate-700 min-h-screen justify-center items-center">
      <div className="w-full pt-16 md:pt-20 px-4 max-w-sm md:max-w-md mb-24">
        <h1 className="text-center text-3xl md:text-4xl uppercase font-semibold mb-4 ">{title}</h1>
        <div className="mb-6">
          <ListItems classnameUl="flex justify-center italic gap-5" classnameLi="px-3 text-md text-teal-500 underline-offset-2 rounded-lg hover:text-teal-200 cursor-pointer transition duration-500" />
        </div>
        <ListImageCoffe />
      </div>
    </div>
  );
};

export default ProductCoffe;