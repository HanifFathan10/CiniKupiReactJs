import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { Skeleton } from "@chakra-ui/react";
import BreadCrumbMenu from "../../BreadCrumb/BreadCrumbMenu";

const MenuProducts = ({ title, id, image, isLoading }) => {
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
          <>
            {image.map((img, index) => {
              if (img.category === "drinks" && id === "drink") {
                return (
                  <Link key={index} to={`/menu/${img.nameurl}`}>
                    <Cart image={img.image} title={img.name} key={index} />
                  </Link>
                );
              } else if (img.category === "food" && id === "food") {
                return (
                  <Link key={index} to={`/menu/${img.nameurl}`}>
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
          </>
        )}
      </div>
    </section>
  );
};

export default MenuProducts;
