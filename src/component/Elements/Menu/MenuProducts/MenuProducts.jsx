import React, { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";

const MenuProducts = (props) => {
  const { title, id } = props;
  const [image, setImage] = useState([]);

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
    });
  }, []);
  return (
    <section id={id} className="mt-6">
      <h2 className="text-xl font-semibold mb-5">{title}</h2>
      <hr aria-hidden="true" className="pb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {image.map((img, index) => {
          if (img.category === "drinks" && id === "drink") {
            return (
              <Link key={index} to={`/menu/drink/${img.nameurl}`}>
                <Cart image={img.image} title={img.name} key={index} />
              </Link>
            );
          } else if (img.category === "food" && id === "food") {
            return (
              <Link key={index} to={`/menu/food/${img.nameurl}`}>
                <Cart image={img.image} title={img.name} key={index} />
              </Link>
            );
          } else if (img.category === "coffe beans" && id === "coffe") {
            return (
              <Link key={index} to={`/menu/${img.nameurl}`}>
                <Cart image={img.image} title={img.name} key={index} />
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
};

export default MenuProducts;
