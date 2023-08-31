import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Prodak from "../Prodak";

const CoffeSlide = () => {
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
        <Prodak name="Americano" price="Rp19.000" image="ImageCoffe/coffe1.jpg" alt="Americano" />
        <Prodak name="Coffe Latte" price="Rp22.000" image="ImageCoffe/coffe2.jpg" alt="Latte" />
        <Prodak name="Caramel Macchiato" price="Rp26.000" image="ImageCoffe/coffe3.jpg" alt="macchiato" />
        <Prodak name="Cappuccino" price="Rp23.500" image="ImageCoffe/coffe4.jpg" alt="Cappuccino" />
        <Prodak name="Hazelnut latte" price="Rp27.000" image="ImageCoffe/coffe5.jpg" alt="HazelnutLatte" />
      </Carousel>
    </div>
  );
};

export default CoffeSlide;