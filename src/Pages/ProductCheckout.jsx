import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNestedMenuById } from "../services/Menu.service";
import AuthDetail from "../component/Layouts/AuthDetail";
import { addToCart } from "../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import ProductCOskeleton from "../component/Elements/CartOrder/ProductCOskeleton";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { useToast } from "@chakra-ui/react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, cartItems] = addToCart(useShallow((state) => [state.addToCart, state.cartItems]));
  const toast = useToast();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    // Popup addtocart

    const lengthItems = cartItems.length === 20;
    if (lengthItems) {
      const id = "max-order";
      !toast.isActive(id) &&
        toast({
          id,
          title: "Maximum order is 20 items. Please adjust your order.",
          containerStyle: {
            marginTop: "80px",
            fontSize: "12px",
          },
          status: "error",
          position: "top",
          isClosable: true,
        });
    } else {
      const product = await axios.get(`https://cini-kupi-react-js-api.vercel.app/api/v1/nested/${_id}`).then((res) => res.data.data.product[0]);
      cart(product);
      const id = "success-order";
      !toast.isActive(id) &&
        toast({
          id,
          title: "Success add to cart",
          containerStyle: {
            marginTop: "80px",
          },
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
    }
  };

  useEffect(() => {
    getNestedMenuById(_id, (data) => {
      setImages(data.product[0]);
      setIsLoading(false);
    });
  }, [_id]);

  return (
    <>
      <HeadMetaData title={images.name} metaDescription="Checkout page by CiniKupi" />
      <AuthDetail>
        {isLoading ? (
          <ProductCOskeleton />
        ) : (
          <section className="bg-primary w-full min-h-screen grid grid-cols-1 items-center md:justify-center shadow-md shadow-gray-700">
            <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center mt-28">
              <div className="w-full h-full p-2 flex justify-center items-center">
                <div className="bg-dark h-44 w-44 md:w-52 md:h-52 rounded-full border border-secondary overflow-hidden flex items-center justify-center">
                  <img src={images.image} className="w-[132px] bg-cover bg-center p-2" />
                </div>
              </div>
              <div className="flex w-full h-full flex-col justify-center max-md:items-center mt-10 md:mt-0 text-light">
                <h1 className="text-lg md:text-xl lg:text-3xl uppercase font-bold border-b-2 w-fit border-secondary">{images.name}</h1>
                <h2 className="text-lg md:text-2xl font-extralight my-2">Rp. {images.price}</h2>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center text-light py-6 px-2 md:mt-10">
              <div className="md:w-4/5">
                <div className="w-fit border border-secondary flex justify-center items-center rounded full md:text-lg px-2 mb-4 text-secondary">
                  <h1>200</h1>
                  <Star />
                  <h1>Items</h1>
                </div>
                <div className="mb-4 max-w-xs md:max-w-sm">
                  <p className="text-xs lg:text-base text-[#b2b4a1]">{images.descriptions}</p>
                </div>
                <div>
                  {!images.fat && !images.calories && !images.sugar ? (
                    ""
                  ) : (
                    <h3 className="text-xs font-semibold">
                      {images.calories} Calories, {images.sugar}g sugar, {images.fat}g fat
                    </h3>
                  )}
                </div>
                <div className="flex w-full justify-end">
                  <Link onClick={handleAddToCart} className="bg-green py-3 mt-10 px-5 md:py-6 md:px-8 rounded-full font-semibold flex shadow-xl hover:bg-[#4abd93] focus:ring-4 focus:ring-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mb-10 ml-4 mt-20 md:ml-10">
              <h1 className="font-bold text-lg text-light border-b-4 border-green w-fit">Recommended Product</h1>
            </div>
            <ProdakSlide />
          </section>
        )}
      </AuthDetail>
    </>
  );
};

const Star = () => (
  <svg width="20px" height="20px" viewBox="0 0 1024.00 1024.00" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M541.44 103.68l126.72 256 282.88 42.24-204.8 198.4L794.88 883.2 541.44 750.08 288 883.2l48.64-282.88-204.8-198.4 282.88-42.24z" fill="#cba258"></path>
      <path d="M794.88 896c-2.56 0-3.84 0-6.4-1.28L541.44 764.16 294.4 894.72c-3.84 2.56-8.96 1.28-14.08-1.28-3.84-2.56-6.4-7.68-5.12-12.8l47.36-275.2L122.88 410.88c-3.84-3.84-5.12-8.96-3.84-12.8s5.12-7.68 10.24-8.96l276.48-39.68 124.16-250.88c3.84-8.96 19.2-8.96 23.04 0l124.16 250.88 276.48 39.68c5.12 1.28 8.96 3.84 10.24 8.96 1.28 5.12 0 10.24-3.84 12.8L760.32 605.44l47.36 275.2c1.28 5.12-1.28 10.24-5.12 12.8-2.56 1.28-5.12 2.56-7.68 2.56zM541.44 737.28c2.56 0 3.84 0 6.4 1.28l230.4 121.6-43.52-256c-1.28-3.84 1.28-8.96 3.84-11.52l185.6-181.76-257.28-37.12c-3.84 0-7.68-3.84-10.24-6.4l-115.2-232.96-115.2 232.96c-1.28 3.84-5.12 6.4-10.24 6.4l-257.28 37.12L345.6 591.36c2.56 2.56 3.84 7.68 3.84 11.52l-43.52 256 230.4-121.6h5.12z" fill="#212121"></path>
    </g>
  </svg>
);

export default ProductCheckout;
