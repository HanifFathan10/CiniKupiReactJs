import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { Skeleton } from "@chakra-ui/react";
import BreadCrumbMenu from "../../BreadCrumb/BreadCrumbMenu";

interface MenuProducts {
  title: string;
  id: string;
  menus: TDataMenu[];
  isLoading: boolean;
}

const MenuProducts = ({ title, id, menus, isLoading }: MenuProducts) => {
  return (
    <section id={id} className="mt-6">
      <h2 className="mb-3 text-xl font-semibold">
        {isLoading ? (
          <Skeleton
            width={32}
            height={10}
            startColor="#444"
            endColor="#202020"
            rounded={10}
          />
        ) : (
          <BreadCrumbMenu linkMenu={title} hrefMenu={"/menu"} />
        )}
      </h2>
      <hr aria-hidden="true" className="pb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {isLoading ? (
          <CartSkeleton />
        ) : (
          <React.Fragment>
            {menus.map((menu, index) => {
              if (menu.category === "drinks" && id === "drink") {
                return (
                  <Link key={index} to={`/menu/${menu.nameurl}`}>
                    <Cart image={menu.image} title={menu.name} key={index} />
                  </Link>
                );
              } else if (menu.category === "food" && id === "food") {
                return (
                  <Link key={index} to={`/menu/${menu.nameurl}`}>
                    <Cart image={menu.image} title={menu.name} key={index} />
                  </Link>
                );
              } else if (menu.category === "coffe beans" && id === "coffe") {
                return (
                  <Link key={index} to={`/menu/${menu.nameurl}`}>
                    <Cart image={menu.image} title={menu.name} key={index} />
                  </Link>
                );
              }
            })}
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default MenuProducts;
