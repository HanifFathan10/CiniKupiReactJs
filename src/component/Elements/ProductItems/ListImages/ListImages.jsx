import React, { useEffect, useState } from "react";
import { getImage } from "../../../../services/product.service";

const ListImages = () => {
  const [gambar, setGambar] = useState([]);

  useEffect(() => {
    getImage((data) => {
      setGambar(data);
    });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex gap-3">
        <div className="grid grid-cols-1">
          <img src="images/1.jpg" alt="coffe1" className="h-full w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-2 text-black gap-3">
          {gambar.map((image) => {
            if (image.category === "default") {
              return <img key={image._id} src={image.image} alt={image.name} className="h-full w-full rounded-lg" />
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ListImages;
