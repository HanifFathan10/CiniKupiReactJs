import React, { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const MenuList = () => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
      setIsLoading(false);
    });
  }, []);

  const CartMenu = ({ title, id }) => {
    return (
      <>
        <span className="text-md font-semibold text-xl border-b-2 border-[#eaeaea]-400">{title || <Skeleton height={20} width={120} />}</span>
        <ul id={id} className="py-3 px-2">
          {isLoading ? (
            <Skeleton width={120} height={16} count={4} />
          ) : (
            <>
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
            </>
          )}
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
