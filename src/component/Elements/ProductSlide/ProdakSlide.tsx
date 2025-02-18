import React from "react";
import Prodak from "./Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useProductStore from "../../../Store/ProductStore";
import { reproduce } from "../../../services/Menu.service";

const ProdakSlide = () => {
  const products = useProductStore((state) => state.products);
  const reproduceData = reproduce(products, 6).data as TDataSingleProduct[];

  const responsive = {
    desktop: {
      breakpoint: { max: 4280, min: 768 },
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
    <Carousel responsive={responsive} className="my-6">
      {reproduceData.map((product, i) => (
        <Prodak
          key={i}
          _id={product._id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </Carousel>
  );
};

export default ProdakSlide;
