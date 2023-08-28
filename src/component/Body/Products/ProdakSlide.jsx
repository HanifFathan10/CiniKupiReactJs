import React from "react";
import Prodak from "./Carousel/Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const ProdakSlide = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    // md -> xl
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 3,
    },
    // sm -> md
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    // default
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="text-black bg-slate-700 px-5 py-10">
      <Carousel responsive={responsive}>
        <Prodak />
        <Prodak />
        <Prodak />
        <Prodak />
        <Prodak />
      </Carousel>
    </div>
  );
};

export default ProdakSlide;
