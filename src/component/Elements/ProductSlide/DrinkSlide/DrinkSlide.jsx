import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Prodak from "../Prodak";

const DrinkSlide = () => {
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
        <Prodak name="Ocean Lemon Tea" price="Rp19.999" image="ImageDrink/drink1.jpg" alt="OceanLemon" />
        <Prodak name="Green Tea sfulsh" price="Rp21.000" image="ImageDrink/drink2.jpg" alt="Greentea" />
        <Prodak name="Mix Berry fruit" price="Rp35.000" image="ImageDrink/drink3.jpg" alt="MixBerry" />
        <Prodak name="Vanilla Choco Cream" price="Rp23.000" image="ImageDrink/drink4.jpg" alt="VanilaChoco" />
        <Prodak name="Ice Mango Hawai" price="Rp22.500" image="ImageDrink/drink5.jpg" alt="IceMango" />
      </Carousel>
    </div>
  );
};

export default DrinkSlide;