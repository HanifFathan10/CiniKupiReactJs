import React, { useEffect, useState } from "react";
import { getImage } from "../../../../services/product.service";

const ListImages = ({ type }) => {
  const [gambar, setGambar] = useState([]);

  useEffect(() => {
    getImage((data) => {
      setGambar(data);
    });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex gap-3">
        <div className="grid grid-cols-1">{type === "default" ? <img src="images/1.jpg" alt="coffe1" className="h-full w-full rounded-lg grayscale transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:grayscale-0" /> : ""}</div>
        <div className={`${type === "default" ? "grid grid-cols-2 text-black gap-3" : "grid grid-cols-2 md:grid-cols-3 text-black gap-3"} `}>
          {gambar.map((image) => {
            if (image.category === "default" && type === "default") {
              return <img key={image._id} src={image.image} alt={image.name} className="h-full w-full rounded-lg grayscale transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:grayscale-0" />;
            } else if (image.category === "coffe" && type === "coffe") {
              return <img key={image._id} src={image.image} alt={image.name} className="h-full w-full rounded-lg grayscale transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:grayscale-0" />;
            } else if (image.category === "drink" && type === "drink") {
              return <img key={image._id} src={image.image} alt={image.name} className="h-full w-full rounded-lg grayscale transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:grayscale-0" />;
            } else if (image.category === "dessert" && type === "dessert") {
              return <img key={image._id} src={image.image} alt={image.name} className="h-full w-full rounded-lg grayscale transition duration-500 ease-in-out cursor-pointer hover:scale-110 hover:grayscale-0" />;
            } else {
              return [];
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ListImages;
