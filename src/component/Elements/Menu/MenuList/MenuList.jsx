import React, { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";

const MenuList = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
    });
  }, []);

  const CartMenu = (props) => {
    const { title, id } = props;
    return (
      <>
        <span className="text-md font-semibold text-xl border-b-2 border-[#eaeaea]-400">{title}</span>
        <ul id={id} className="py-3 px-2">
          {image.map((img, index) => {
            if (img.category === "drinks" && id === "drinks") {
              return (
                <li key={index} className="my-3">
                  <Link to={`/menu/drink/${img.nameurl}`} className="font-extralight">
                    {img.name}
                  </Link>
                </li>
              );
            } else if (img.category === "food" && id === "food") {
              return (
                <li key={index} className="my-3">
                  <Link to={`/menu/food/${img.nameurl}`} className="font-extralight">
                    {img.name}
                  </Link>
                </li>
              );
            } else if (img.category === "coffe beans" && id === "coffe beans") {
              return (
                <li key={index} className="my-3">
                  <Link to={`/menu/${img.nameurl}`} className="font-extralight">
                    {img.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </>
    );
  };

  const Menu = [
    {
      id: "Drinks",
      content: <CartMenu title="Drinks" id="drinks" />,
    },
    {
      id: "Food",
      content: <CartMenu title="Foods" id="food" />,
    },
    {
      id: "coffe beans",
      content: <CartMenu title="Coffe Beans" id="coffe beans" />,
    },
  ];
  return (
    <>
      {Menu.find((menu) => menu.id === "Drinks")?.content}
      {Menu.find((menu) => menu.id === "Food")?.content}
      {Menu.find((menu) => menu.id === "coffe beans")?.content}
    </>
  );
};

export default MenuList;
