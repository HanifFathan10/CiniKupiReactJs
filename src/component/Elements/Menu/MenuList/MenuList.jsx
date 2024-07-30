import React, { useEffect, useState } from "react";
import { GetAllMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

const MenuList = () => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllMenu((status, data) => {
        if (status === true) {
          setImage(data);
          setIsLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  const animateClass = "";

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
            <React.Fragment>
              {image.map((img, index) => {
                if (img.category === "drinks" && id === "drinks") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${img.nameurl}`}
                        className="relative inline cursor-pointer rounded border-secondary text-sm font-extralight before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:bg-secondary before:transition before:duration-300 before:ease-in-out hover:rounded-b-none hover:before:origin-bottom-left hover:before:scale-x-100 lg:py-1"
                      >
                        {img.name}
                      </Link>
                    </li>
                  );
                } else if (img.category === "food" && id === "food") {
                  return (
                    <li key={index} className="my-3">
                      <Link
                        to={`/menu/${img.nameurl}`}
                        className="relative inline cursor-pointer rounded border-secondary text-sm font-extralight before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:bg-secondary before:transition before:duration-300 before:ease-in-out hover:rounded-b-none hover:before:origin-bottom-left hover:before:scale-x-100 lg:py-1"
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
                        className="relative inline cursor-pointer rounded border-secondary text-sm font-extralight before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:bg-secondary before:transition before:duration-300 before:ease-in-out hover:rounded-b-none hover:before:origin-bottom-left hover:before:scale-x-100 lg:py-1"
                      >
                        {img.name}
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
