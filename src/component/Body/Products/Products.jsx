import React from "react";

const Products = () => {
    const Lists = [
        {name : "coffe"},
        {name : "drink"},
        {name : "dessert"},
    ]

    const images = [
        {src : "images/2.jpg", alt : "coffe2"},
        {src : "images/3.jpg", alt : "coffe3"},
        {src : "images/4.jpg", alt : "coffe4"},
        {src : "images/5.jpg", alt : "coffe5"},
    ]
  return (
    <div className="flex bg-slate-700 min-h-screen justify-center items-center">
      <div className="w-full pt-16 md:pt-20 px-4 max-w-sm md:max-w-md mb-24">
        <h1 className="text-center text-3xl md:text-4xl uppercase font-semibold mb-4 ">Product</h1>
        <div className="mb-6">
          <ul className="flex justify-center italic gap-5">
            {Lists.map((list)=> (
                <li key={list.name} className="px-3 text-md text-teal-500 underline-offset-2 rounded-lg hover:text-teal-200 cursor-pointer transition duration-500">{list.name}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-3">
            <div className="grid grid-cols-1">
              <img src="images/1.jpg" alt="coffe1" className="h-full w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-2 text-black gap-3">
              {images.map((image)=> (
                  <img key={image.alt} src={image.src} alt={image.alt} className="h-full w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
