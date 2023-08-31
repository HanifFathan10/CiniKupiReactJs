import React from "react";
import Prodak from "./Prodak";
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
        <Prodak name="Americano" price="Rp19.000" image="ImageCoffe/coffe1.jpg" alt="Americano" />
        <Prodak name="Coffe Latte" price="Rp22.000" image="ImageCoffe/coffe2.jpg" alt="Latte" />
        <Prodak name="Caramel Macchiato" price="Rp26.000" image="ImageCoffe/coffe3.jpg" alt="macchiato" />
        <Prodak name="Cappuccino" price="Rp23.500" image="ImageCoffe/coffe4.jpg" alt="Cappuccino" />
        <Prodak name="Hazelnut latte" price="Rp27.000" image="ImageCoffe/coffe5.jpg" alt="HazelnutLatte" />
        <Prodak name="Ocean Lemon Tea" price="Rp19.999" image="ImageDrink/drink1.jpg" alt="OceanLemon" />
        <Prodak name="Green Tea sfulsh" price="Rp21.000" image="ImageDrink/drink2.jpg" alt="Greentea" />
        <Prodak name="Mix Berry fruit" price="Rp35.000" image="ImageDrink/drink3.jpg" alt="MixBerry" />
        <Prodak name="Vanilla Choco Cream" price="Rp23.000" image="ImageDrink/drink4.jpg" alt="VanilaChoco" />
        <Prodak name="Ice Mango Hawai" price="Rp22.500" image="ImageDrink/drink5.jpg" alt="IceMango" />
        <Prodak name="American Pie Medium" price="Rp49.000" image="ImageDessert/dessert1.jpg" alt="AmericanPie" />
        <Prodak name="Dessert Vanilla with caramel" price="Rp25.000" image="ImageDessert/dessert2.jpg" alt="dessertvanilla" />
        <Prodak name="Creepes Fruit" price="Rp21.000" image="ImageDessert/dessert3.jpg" alt="CreepesFruit" />
        <Prodak name="Pancake Berry Swiff" price="Rp25.000" image="ImageDessert/dessert4.jpg" alt="PancakeBerry" />
        <Prodak name="Deluxe Strowberry Cake" price="Rp38.500" image="ImageDessert/dessert5.jpg" alt="Deluxe Strowberry" />
      </Carousel>
    </div>
  );
};

export default ProdakSlide;