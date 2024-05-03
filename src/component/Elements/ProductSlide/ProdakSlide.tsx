import * as React from "react";
import { useEffect, useState } from "react";
import Prodak from "./Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { getImageMenu, reproduce } from "../../../services/Menu.service";
import "react-multi-carousel/lib/styles.css";
import { Imenu } from "../../../Interface/itemsProduct";

const ProdakSlide = () => {
  const [gambar, setGambar] = useState<Imenu[]>([]);

  useEffect(() => {
    getImageMenu((status, data) => {
      if (status === true) {
        const product = data.flatMap((item: Imenu) => item.product);
        setGambar(reproduce(product, 6));
      }
    });
  }, []);

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
    <>
      <Carousel responsive={responsive} className="my-6">
        {gambar.map((image) => (
          <Prodak
            key={image._id}
            _id={image._id}
            name={image.name}
            image={image.image}
            price={image.price}
            alt={image.name}
          />
        ))}
      </Carousel>
    </>
  );
};

export default ProdakSlide;
