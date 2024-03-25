import React, { useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { Skeleton } from "@chakra-ui/react";

const MenuProducts = ({ title, id }) => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <section id={id} className="mt-6">
      <h2 className="mb-5 text-xl font-semibold">
        {isLoading ? (
          <Skeleton
            width={32}
            height={10}
            startColor="#444"
            endColor="#202020"
            rounded={10}
          />
        ) : (
          title
        )}
      </h2>
      <hr aria-hidden="true" className="pb-7" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
        {isLoading ? (
          <CartSkeleton />
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};

export default MenuProducts;
