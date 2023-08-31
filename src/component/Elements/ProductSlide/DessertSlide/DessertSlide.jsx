import React from "react";
import Prodak from "../Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const DessertSlide = () => {
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
        <Prodak name="American Pie Medium" price="Rp49.000" image="ImageDessert/dessert1.jpg" alt="AmericanPie" />
        <Prodak name="Dessert Vanilla with caramel" price="Rp25.000" image="ImageDessert/dessert2.jpg" alt="dessertvanilla" />
        <Prodak name="Creepes Fruit" price="Rp21.000" image="ImageDessert/dessert3.jpg" alt="CreepesFruit" />
        <Prodak name="Pancake Berry Swiff" price="Rp25.000" image="ImageDessert/dessert4.jpg" alt="PancakeBerry" />
        <Prodak name="Deluxe Strowberry Cake" price="Rp38.500" image="ImageDessert/dessert5.jpg" alt="Deluxe Strowberry" />
      </Carousel>
    </div>
  );
};

export default DessertSlide;