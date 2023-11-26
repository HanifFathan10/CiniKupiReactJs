import React, { useEffect, useState } from "react";
import Prodak from "./Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { getImageMenu, reproduce } from "../../../services/Menu.service";
import "react-multi-carousel/lib/styles.css";

const ProdakSlide = () => {
  const [gambar, setGambar] = useState([]);

  useEffect(() => {
    getImageMenu((data) => {
      const product = data.flatMap((item) => item.product);
      const result = reproduce(product, 6);
      setGambar(result.data);
    });
  }, []);

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
    <>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]}>
        {gambar.map((image) => (
          <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />
        ))}
      </Carousel>
    </>
  );
};

export default ProdakSlide;
