import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNestedMenuById } from "../services/Menu.service";
import AuthDetail from "../component/Layouts/AuthDetail";
import { addToCart } from "../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import ProductCOskeleton from "../component/Elements/CartOrder/ProductCOskeleton";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [images, setImages] = useState({});
  const cart = addToCart(useShallow((state) => state.addToCart));
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const product = await axios.get(`https://cini-kupi-react-js-api.vercel.app/api/v1/nested/${_id}`).then((res) => res.data.data.product[0]);
    cart(product);
  };

  useEffect(() => {
    getNestedMenuById(_id, (data) => {
      setImages(data.product[0]);
      setIsLoading(false);
    });
  }, [_id]);

  return (
    <AuthDetail>
      {isLoading ? (
        <ProductCOskeleton />
      ) : (
        <section className="bg-[#1f3933] w-full min-h-screen grid grid-cols-1 items-center md:justify-center shadow-md shadow-gray-700">
          <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center mt-28">
            <div className="w-full h-full p-2 flex justify-center items-center">
              <div className="bg-[#212121] h-44 w-44 md:w-52 md:h-52 rounded-full border border-[#cba258] overflow-hidden flex items-center justify-center">
                <img src={images.image} className="w-[132px] bg-cover bg-center p-2" />
              </div>
            </div>
            <div className="flex w-full h-full flex-col justify-center max-md:items-center mt-10 md:mt-0 text-[#ffffff]">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold border-b-2 w-fit border-[#cba258]">{images.name}</h1>
              <h2 className="text-lg md:text-2xl font-extralight my-2">Rp. {images.price}</h2>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center bg-[#1e3932] text-[#ffffff] py-6 px-2 md:mt-10">
            <div className="md:w-4/5">
              <div className="w-fit border border-[#cba258] rounded full md:text-lg flex px-2 gap-1 mb-4 text-[#cba258]">
                <h1>200</h1>
                <h1>Items</h1>
              </div>
              <div className="mb-4 md:w-[560px]">
                <p className="text-xs md:text-base text-[#b2b4a1]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repellendus quo exercitationem inventore tempora deserunt architecto error commodi! Exercitationem eum quod debitis quisquam.</p>
              </div>
              <div className="text-xs font-semibold">
                <h3>15 Calories, 0g sugar, 0g fat</h3>
              </div>
              <div className="flex w-full justify-end">
                <Link onClick={handleAddToCart} className="bg-[#00754a] py-3 mt-10 px-5 md:py-6 md:px-8 rounded-full font-semibold flex shadow-xl hover:bg-[#4abd93] focus:ring-4 focus:ring-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                  Add To Cart
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </AuthDetail>
  );
};

export default ProductCheckout;
