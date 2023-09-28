import React, { useEffect, useState } from "react";
import Prodak from "./Prodak";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { getImage } from "../../../services/product.service";

const ProdakSlide = ({ type }) => {
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

  const filterDefault = () => {
    gambar
      .filter((image) => image.category !== "default")
      .map((image) => {
        return <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />;
      });
  };
  const filterCoffe = () => {
    gambar
      .filter((image) => image.category === "coffe")
      .map((image) => {
        return <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />;
      });
  };
  const filterDrink = () => {
    gambar
      .filter((image) => image.category === "drink")
      .map((image) => {
        return <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />;
      });
  };
  const filterDessert = () => {
    gambar
      .filter((image) => image.category === "dessert")
      .map((image) => {
        return <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />;
      });
  };

  return (
    <div className="text-black bg-slate-700 px-5 py-10 block">
      <Carousel responsive={responsive} className="">
        {gambar
          .filter((image) => {
            if (image.category !== "default" && type === "default") {
              return true;
            } else if (image.category === "coffe" && type === "coffe") {
              return true;
            } else if (image.category === "drink" && type === "drink") {
              return true;
            } else if (image.category === "dessert" && type === "dessert") {
              return true;
            } else {
              return false;
            }
          })
          .map((image) => (
            <Prodak key={image._id} _id={image._id} name={image.name} image={image.image} price={image.price} alt={image.name} />
          ))}
      </Carousel>
    </div>
  );
};

export default ProdakSlide;
