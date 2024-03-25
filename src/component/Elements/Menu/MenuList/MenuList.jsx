import React, { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

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
        <span className="text-md border-[#eaeaea]-400 border-b-2 text-xl font-semibold">
          {isLoading ? (
            <Skeleton
              width={20}
              height={5}
              startColor="#444"
              endColor="#202020"
            />
          ) : (
            title
          )}
        </span>
        <ul id={id} className="px-2 py-3">
          {isLoading ? (
            <>
              <Skeleton
                width={32}
                height={4}
                marginY={3}
                startColor="#444"
                endColor="#202020"
              />
              <Skeleton
                width={32}
                height={4}
                marginY={3}
                startColor="#444"
                endColor="#202020"
              />
              <Skeleton
                width={32}
                height={4}
                marginY={3}
                startColor="#444"
                endColor="#202020"
              />
            </>
          ) : (
            <>
              {image.map((img, index) => {
                if (img.category === "drinks" && id === "drinks") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/drink/${img.nameurl}`}
                        className="font-extralight"
                      >
                        {img.name}
                      </Link>
                    </li>
                  );
                } else if (img.category === "food" && id === "food") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/food/${img.nameurl}`}
                        className="font-extralight"
                      >
                        {img.name}
                      </Link>
                    </li>
                  );
                } else if (
                  img.category === "coffe beans" &&
                  id === "coffe beans"
                ) {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${img.nameurl}`}
                        className="font-extralight"
                      >
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
