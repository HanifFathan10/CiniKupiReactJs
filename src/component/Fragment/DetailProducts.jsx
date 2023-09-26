import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getImageById } from "../../services/product.service";
import Button from "../Elements/Button/Button";

const DetailProducts = () => {
  const { id } = useParams();
  const [images, setImages] = useState({});
  const [count, setCount] = useState(0);
  const Navigate = useNavigate();

  const handleOrder = () => {
    Navigate("/coomingsoon");
  };

  function handlePlus() {
    if (count !== 20) {
      setCount(count + 1);
    }
  }

  function handleMinus() {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    getImageById(id, (data) => {
      setImages(data);
    });
  }, [id]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#ffffff]">
      <div className="max-w-md mx-auto rounded-xl bg-white shadow-md overflow-hidden md:max-w-2xl my-12">
        <div className="md:flex">
          <div className="p-8 md:shrink-0 md:p-0">
            <img className="max-h-xs w-full object-contain md:object-cover md:h-full md:w-48" src={images.image} alt={images.name} />
          </div>
          <div className="pt-8 px-8">
            <div className="flex justify-between">
              <h1 className="uppercase tracking-wide text-2xl mb-2 font-bold">{images.name}</h1>
              <h2 className="text-md italic">{images.category}</h2>
            </div>
            <h3 className="block mt-1 text-lg leading-tight font-normal text-black">Rp. {images.price}</h3>
            <p className="mt-2 text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero doloremque earum dolore amet quos ex consequatur cum enim laboriosam? Recusandae!</p>
            <div className="flex flex-wrap justify-between py-4 px-1 mt-4 md:mt-14">
              <div className="flex justify-center items-center">
                <Button background="bg-slate-400 px-3 py-1" text="-" onClick={handleMinus} />
                <p className="mx-2">{count}</p>
                <Button background="bg-slate-400 px-3 py-1" text="+" onClick={handlePlus} />
              </div>
              <Button background="bg-cyan-600 text-white font-bold px-4 py-3" text="Order Now" onClick={handleOrder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
