import React, { useEffect } from "react";
import useDisplayProduct from "../../../../Store/DisplayProduct";

interface ListImagesProps {
  type: string;
}

const ListImages = ({ type }: ListImagesProps) => {
  const [dplProduct, getDisplayProduct] = useDisplayProduct((state) => [
    state.dplProduct,
    state.getDisplayProduct,
  ]);

  useEffect(() => {
    getDisplayProduct();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid w-[80vw] gap-3 sm:flex sm:w-full">
        <div className="grid grid-cols-1">
          {type === "default" ? (
            <img
              src="images/1.jpg"
              alt="coffe1"
              width={100}
              height={100}
              className="h-full w-full cursor-pointer rounded-lg grayscale transition duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
              loading="lazy"
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={`${
            type === "default"
              ? "grid grid-cols-2 gap-3"
              : "grid grid-cols-2 gap-3 md:grid-cols-3"
          } `}
        >
          {dplProduct.map((image) => {
            if (image.category === "default" && type === "default") {
              return (
                <img
                  key={image._id}
                  src={image.image}
                  alt={image.name}
                  loading="lazy"
                  className="h-full w-full cursor-pointer rounded-lg bg-cover bg-center object-cover grayscale transition duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
                />
              );
            } else if (image.category === "coffe" && type === "coffe") {
              return (
                <img
                  key={image._id}
                  src={image.image}
                  alt={image.name}
                  loading="lazy"
                  className="h-full w-full cursor-pointer rounded-lg bg-cover bg-center object-cover grayscale transition duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
                />
              );
            } else if (image.category === "drink" && type === "drink") {
              return (
                <img
                  key={image._id}
                  src={image.image}
                  alt={image.name}
                  loading="lazy"
                  className="h-full w-full cursor-pointer rounded-lg bg-cover bg-center object-cover grayscale transition duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
                />
              );
            } else if (image.category === "dessert" && type === "dessert") {
              return (
                <img
                  key={image._id}
                  src={image.image}
                  alt={image.name}
                  loading="lazy"
                  className="h-full w-full cursor-pointer rounded-lg bg-cover bg-center object-cover grayscale transition duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ListImages;
