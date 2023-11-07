import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNestedMenuById } from "../services/Menu.service";
import Button from "../component/Elements/Button/Button";
import AuthDetail from "../component/Layouts/AuthDetail";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [images, setImages] = useState({});
  const [count, setCount] = useState(0);
  const Navigate = useNavigate();

  const handleOrder = () => {
    Navigate("/coomingsoon");
  };

  function handlePlus() {
    if (count !== 12) {
      setCount(count + 1);
    }
  }

  function handleMinus() {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    getNestedMenuById(_id, (data) => {
      setImages(data.product[0]);
    });
  }, [_id]);

  return (
    <AuthDetail>
      <div className="bg-[#1f3933] w-full min-h-screen grid grid-cols-1 items-center md:justify-center shadow-md shadow-gray-700">
        <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center mt-28">
          <div className="w-full h-full p-2">
            <div className="flex justify-center items-center">
              <img src={images.image} className="w-36" />
            </div>
          </div>
          <div className="flex w-full h-full flex-col justify-center max-md:items-center mt-10 md:mt-0 text-[#ffffff]">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold border-b-2 w-fit border-[#cba258]">{images.name}</h1>
            <h2 className="text-lg md:text-2xl font-extralight my-2">Rp. {images.price}</h2>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center bg-[#1e3932] text-[#ffffff] py-6 px-2 md:mt-10">
          <div className="md:w-4/5">
            <div className="w-fit border border-[#cba258] rounded full md:text-lg flex px-2 gap-1 mb-4 text-[#cba258]">
              <h1>200</h1>
              <h1>Items</h1>
            </div>
            <div className="mb-4 md:w-[420px]">
              <p className="text-xs md:text-base text-[#b2b4a1]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repellendus quo exercitationem inventore tempora deserunt architecto error commodi! Exercitationem eum quod debitis quisquam.</p>
            </div>
            <div className="text-xs font-semibold">
              <h3>15 Calories, 0g sugar, 0g fat</h3>
            </div>
            <div className="flex w-full justify-between px-3 mt-10">
              <div className="flex justify-center items-center gap-2 text-[#ffffff]">
                <Button onClick={handleMinus} text="-" background={`w-10 h-auto bg-[#212121] ${count === 0 ? "hidden" : "block focus:border focus:border-[#cba258]"}`} />
                <h1>{count}</h1>
                <Button onClick={handlePlus} text="+" background="w-10 h-auto bg-[#212121] focus:border focus:border-[#cba258]" />
              </div>
              <Button text="Add To Order" background="bg-[#00754a] rounded-full text-xl text-[#ffffff] font-bold py-3 px-3" />
            </div>
          </div>
        </div>
      </div>
    </AuthDetail>
  );
};

export default ProductCheckout;
