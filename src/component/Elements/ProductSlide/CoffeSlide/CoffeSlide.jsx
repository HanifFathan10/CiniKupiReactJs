import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Prodak from "../Prodak";
import { getImage } from "../../../../services/product.service";

const CoffeSlide = () => {
  const [gambar, setGambar] = useState([]);

  useEffect(() => {
    getImage((data) => {
      setGambar(data);
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
    <div className="text-black bg-slate-700 px-5 py-10">
      <Carousel responsive={responsive}>
        {gambar.map((image) => {
          if (image.category === "coffe") {
            return <Prodak key={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />
          }
        })}
      </Carousel>
    </div>
  );
};

export default CoffeSlide;