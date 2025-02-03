import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import useMenuStore from "../../../../Store/MenuProduct";
import { useShallow } from "zustand/react/shallow";

interface CartMenu {
  title: string;
  id: string;
}

const MenuList = () => {
  const [menus, isLoading] = useMenuStore(
    useShallow((state) => [state.menus, state.isLoading]),
  );

  const CartMenu = ({ title, id }: CartMenu) => {
    let animateClass =
      "border-teriary before:bg-teriary relative cursor-pointer rounded text-sm font-extralight before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:rounded-b-none hover:before:origin-bottom-left hover:before:scale-x-100 lg:py-1";
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
            <React.Fragment>
              {menus.map((menu, index) => {
                if (menu.category_id?.name === "drinks" && id === "drinks") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${menu.nameUrl}`}
                        className={animateClass}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                } else if (
                  menu.category_id?.name === "foods" &&
                  id === "foods"
                ) {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${menu.nameUrl}`}
                        className={animateClass}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                } else if (
                  menu.category_id?.name === "beans" &&
                  id === "beans"
                ) {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${menu.nameUrl}`}
                        className={animateClass}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                }
              })}
            </React.Fragment>
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
      content: <CartMenu title="Foods" id="foods" />,
    },
    {
      id: "coffe beans",
      content: <CartMenu title="Coffe Beans" id="beans" />,
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
