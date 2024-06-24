import React, { useEffect, useState } from "react";
import Prodak from "./Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { reproduce } from "../../../services/Menu.service";
import "react-multi-carousel/lib/styles.css";
import { getAllMenuProduct } from "../../../services/product.service";

const ProdakSlide = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllMenuProduct((status, res) => {
        if (status === true) {
          const result = reproduce(res.data.products, 6);
          setMenus(result.data);
        }
      });
    };

    fetchData();
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
    <Carousel responsive={responsive} className="my-6">
      {menus.map((image) => (
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
  );
};

export default ProdakSlide;
