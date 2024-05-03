import * as React from "react";
import { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { Imenu } from "../../../../Interface/itemsProduct";

const MenuList = () => {
  const [menus, setmenus] = useState<Imenu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getImageMenu((status, data) => {
      if (status === true) {
        setmenus(data);
        setIsLoading(false);
      }
    });
  }, []);

  const CartMenu = ({ title, id }: { title: string; id: string }) => {
    return (
      <React.Fragment>
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
            <React.Fragment>
              {menus.map((menu, index) => {
                if (menu.category === "drinks" && id === "drinks") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/drink/${menu.nameurl}`}
                        className="font-extralight"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                } else if (menu.category === "food" && id === "food") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/food/${menu.nameurl}`}
                        className="font-extralight"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                } else if (
                  menu.category === "coffe beans" &&
                  id === "coffe beans"
                ) {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${menu.nameurl}`}
                        className="font-extralight"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                }
                return null;
              })}
            </React.Fragment>
          )}
        </ul>
      </React.Fragment>
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
