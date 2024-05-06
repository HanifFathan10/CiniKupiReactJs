import React, { useEffect, useState } from "react";
import QuestionMark from "../Elements/Icon/QuestionMark";
import Plus from "../Elements/Icon/Plus";
import { rupiah } from "../../Hooks/useRupiah";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { SingleStar } from "../Elements/Icon/SingleStar";
import { AddToCart } from "../../services/Order.service";
import { totalItems } from "../../Store/TotalItems";
import { useShallow } from "zustand/react/shallow";
import { getMenuProductById } from "../../services/product.service";

const DetailProduct = ({
  _id,
  image,
  name,
  price,
  descriptions,
  fat,
  calories,
  sugar,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [click, setClick] = useState(false);
  const { count, useCount } = totalItems(
    useShallow((state) => ({ count: state.count, useCount: state.useCount })),
  );

  useEffect(() => {
    if (click === true) {
      useCount();
    }
  }, [click]);

  const toast = useToast();

  const ErrorToast = ({ id, title }) => {
    !toast.isActive(id) &&
      toast({
        id,
        title: title,
        containerStyle: {
          marginTop: "80px",
          fontSize: "12px",
        },
        status: "error",
        position: "top",
        isClosable: true,
      });
  };

  const SuccessToast = ({ id, title }) => {
    !toast.isActive(id) &&
      toast({
        id,
        title: title,
        containerStyle: {
          marginTop: "80px",
        },
        status: "success",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (localStorage.getItem("access_token") === null) {
      const id = "login-required";
      ErrorToast({
        id,
        title: "Please login first!!",
      });
      return;
    }

    setIsLoading(true);
    const maxLength = count === 20;
    if (maxLength) {
      const id = "max-order";
      ErrorToast({
        id,
        title: "Maximum order is 20 items. Please adjust your order.",
      });
    } else {
      getMenuProductById(_id, (status, res) => {
        const dataProduct = {
          id: res.data._id,
          name: res.data.name,
          price: res.data.price,
          image: res.data.image,
          quantity: 1,
        };

        // Hit Endpoint api/v1/order
        AddToCart(dataProduct, (status, res) => {
          if (status === true) {
            setIsLoading(false);
            setClick(true);
            const id = "success-order";
            SuccessToast({
              id,
              title: res.data.message,
            });
          } else {
            const id = "error-fetching";
            ErrorToast({
              id,
              title: res.data.message,
            });
          }
        });
      });
    }
  };

  return (
    <React.Fragment>
      <div className="grid-cols-1 items-center justify-center gap-3 md:flex md:grid-cols-2">
        <div className="mt-4 flex h-full w-full items-center justify-center p-2">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-secondary bg-dark md:h-52 md:w-52">
            <img src={image} className="w-[132px] bg-cover bg-center p-2" />
          </div>
        </div>
        <div className="mt-10 flex h-full w-full flex-col justify-center text-light max-md:items-center md:mt-0">
          <h1 className="w-fit border-b-2 border-secondary text-lg font-bold uppercase md:text-xl lg:text-3xl">
            {name}
          </h1>
          <h2 className="my-2 text-lg font-extralight md:text-2xl">
            {rupiah(price)}
          </h2>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-2 py-6 text-light md:mt-10">
        <div className="md:w-4/5">
          <div className="full mb-4 flex w-fit items-center justify-center rounded border border-secondary px-2 text-secondary md:text-lg">
            <h1>200</h1>
            <SingleStar />
            <h1>Items</h1>
          </div>
          <div className="mb-4 max-w-xs md:max-w-sm">
            <p className="text-xs text-[#b2b4a1] lg:text-base">
              {descriptions}
            </p>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-4">
            {!fat && !calories && !sugar ? (
              ""
            ) : (
              <React.Fragment>
                <h3 className="text-xs font-semibold">
                  {calories} Calories, {sugar}g sugar, {fat}g fat
                </h3>
                <Popover placement="top-start">
                  <PopoverTrigger>
                    <Button variant="white">
                      <QuestionMark />
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
              </React.Fragment>
            )}
          </div>
          <div className="flex w-full items-center justify-end">
            <button
              disabled={isLoading}
              onClick={handleAddToCart}
              className={`mt-10 flex cursor-pointer items-center justify-center rounded-full bg-green px-5 py-3 text-center font-semibold shadow-xl  md:px-8 md:py-6 ${isLoading && "cursor-not-allowed bg-neutral-600"}`}
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
