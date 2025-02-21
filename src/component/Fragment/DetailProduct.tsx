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
import { AddToCart } from "../../services/order.service";
import { totalItems } from "../../Store/TotalItems";
import { useShallow } from "zustand/react/shallow";
import { useCustomToast } from "../../Hooks/useToast";
import { rupiah } from "../../utils/rupiah";
import { QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import useProductStore from "../../Store/ProductStore";

const DetailProduct = ({
  _id,
  image,
  name,
  price,
  description,
  fat,
  calories,
  sugar,
  oz,
}: TDataSingleProduct) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const [count, items, useCount] = totalItems(
    useShallow((state) => [state.count, state.items, state.useCount]),
  );
  const products = useProductStore(useShallow((state) => state.products));
  const findProduct = products.find((prod) => prod._id === _id);
  const dataProduct = {
    _id: findProduct!._id!,
    name: findProduct!.name!,
    quantity: 1,
  };

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
      } else if (count === 20) {
        ErrorToast({
          id: "max-order",
          title: "Maximum order is 20 items. Please adjust your order.",
        });
        return;
      } else {
        setIsLoading(true);
      }

      if (items.find((prod) => prod.name === dataProduct.name)) {
        SuccessToast({
          id: "already-added",
          title: "Item already added. Please adjust your order.",
        });
      } else {
        await AddToCart(dataProduct, (status, res) => {
          if (status === true) {
            setClick(true);
            useCount();
            SuccessToast({
              id: "success-order",
              title: res.message,
            });
          } else {
            ErrorToast({
              id: "error-order",
              title: res.response.data.message,
            });
          }
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        ErrorToast({
          id: "error-fetching",
          title: error.message,
        });
      } else if (error instanceof AxiosError) {
        ErrorToast({
          id: "error-fetching",
          title: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="grid-cols-1 items-center justify-center gap-3 md:flex md:grid-cols-2">
        <div className="mt-4 flex h-full w-full items-center justify-center p-2">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-teriary bg-secondary md:h-52 md:w-52">
            <img src={image} className="w-[132px] bg-cover bg-center" />
          </div>
        </div>
        <div className="mt-10 flex h-full w-full flex-col justify-center text-white max-md:items-center md:mt-0">
          <h1 className="w-fit border-b-2 border-teriary text-lg font-bold uppercase md:text-xl lg:text-3xl">
            {name}
          </h1>
          <h2 className="my-2 text-lg font-extralight md:text-2xl">
            {rupiah(price!)}
          </h2>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-2 py-6 text-white md:mt-10">
        <div className="md:w-4/5">
          <Tooltip
            label="200 Items sold"
            aria-label="200 Items"
            placement="right-end"
            hasArrow
            closeDelay={300}
          >
            <span className=" mb-4 flex w-fit items-center justify-center gap-1 rounded border border-teriary px-2 text-teriary md:text-lg">
              <h1>200</h1>
              <StarIcon className="h-4 w-4" />
              <h1>Items</h1>
            </span>
          </Tooltip>
          <div className="mb-4 max-w-xs md:max-w-sm">
            <p className="text-xs text-white/65 lg:text-base">{description}</p>
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
                      <QuestionMarkCircleIcon className="h-4 w-4 text-teriary" />
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
