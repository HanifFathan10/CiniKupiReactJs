import React, { useEffect, useState } from "react";
import Plus from "../Elements/Icon/Plus";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { AddToCart } from "../../services/Order.service";
import { totalItems } from "../../Store/TotalItems";
import { useShallow } from "zustand/react/shallow";
import { getMenuProductById } from "../../services/product.service";
import { useCustomToast } from "../../Hooks/useToast";
import { rupiah } from "../../utils/rupiah";
import { QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/solid";

const DetailProduct = ({
  _id,
  image,
  name,
  price,
  descriptions,
  fat,
  calories,
  sugar,
  oz,
}: TDataSingleProduct) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const { count, useCount } = totalItems(
    useShallow((state) => ({ count: state.count, useCount: state.useCount })),
  );

  useEffect(() => {
    if (click === true) {
      useCount();
    }
  }, [click]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      if (!sessionStorage.getItem("access_token")) {
        ErrorToast({
          id: "login-required",
          title: "Please login first!!",
        });
        return;
      }

      const maxLength = count === 20;
      if (maxLength) {
        ErrorToast({
          id: "max-order",
          title: "Maximum order is 20 items. Please adjust your order.",
        });
        return;
      }

      setIsLoading(true);
      await getMenuProductById(_id!, async (status, res) => {
        if (status === true) {
          const dataProduct = {
            id: res.data._id,
            name: res.data.name,
            price: res.data.price,
            image: res.data.image,
            quantity: 1,
          };

          await AddToCart(dataProduct, (status, res) => {
            if (status === true) {
              SuccessToast({
                id: "success-order",
                title: res.data.message,
              });
              setClick(true);
              useCount();
            } else {
              ErrorToast({
                id: "error-fetching",
                title: res.response.data.message,
              });
            }
          });
        }
      });
    } catch (error: any) {
      ErrorToast({
        id: "error-fetching",
        title: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="grid-cols-1 items-center justify-center gap-3 md:flex md:grid-cols-2">
        <div className="mt-4 flex h-full w-full items-center justify-center p-2">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-secondary bg-[rgba(0,0,0,0.5)] md:h-52 md:w-52">
            <img src={image} className="w-[132px] bg-cover bg-center p-2" />
          </div>
        </div>
        <div className="mt-10 flex h-full w-full flex-col justify-center text-white max-md:items-center md:mt-0">
          <h1 className="w-fit border-b-2 border-secondary text-lg font-bold uppercase md:text-xl lg:text-3xl">
            {name}
          </h1>
          <h2 className="my-2 text-lg font-extralight md:text-2xl">
            {rupiah(price!)}
          </h2>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-2 py-6 text-white md:mt-10">
        <div className="md:w-4/5">
          <Tooltip label="200 Items sold" aria-label="200 Items">
            <span className=" mb-4 flex w-fit items-center justify-center gap-1 rounded border border-secondary px-2 text-secondary md:text-lg">
              <h1>200</h1>
              <StarIcon className="h-4 w-4" />
              <h1>Items</h1>
            </span>
          </Tooltip>
          <div className="mb-4 max-w-xs md:max-w-sm">
            <p className="text-xs text-[#b2b4a1] lg:text-base">
              {descriptions}
            </p>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-4">
            {!fat && !calories && !sugar && !oz ? (
              ""
            ) : (
              <span className="flex items-center justify-center">
                <h3 className="text-xs font-semibold">
                  {calories} Calories, {sugar}g sugar, {fat}g fat {oz} oz
                </h3>
                <Popover placement="top-start">
                  <PopoverTrigger>
                    <Button variant="white">
                      <QuestionMarkCircleIcon className="h-4 w-4 text-secondary" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="max-w-[190px] text-black md:max-w-xs"
                    borderWidth="2px"
                    borderColor="#cba258"
                  >
                    <PopoverHeader className="text-xs font-medium leading-normal md:text-base">
                      Information is based on standard recipes and does not
                      reflect customizations
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                  </PopoverContent>
                </Popover>
              </span>
            )}
          </div>
          <div className="flex w-full items-center justify-end">
            <button
              disabled={isLoading}
              onClick={handleAddToCart}
              className={`mt-10 flex cursor-pointer items-center justify-center rounded-full bg-green-700 px-5 py-3 text-center font-semibold shadow-xl  md:px-8 md:py-6 ${isLoading && "cursor-not-allowed bg-neutral-600"}`}
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <React.Fragment>
                  <Plus />
                  <h1>Add To Cart</h1>
                </React.Fragment>
              )}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailProduct;
