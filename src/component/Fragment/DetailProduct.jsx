import React, { useState } from "react";
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
import { addToCart } from "../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import { SingleStar } from "../Elements/Icon/SingleStar";
import { getNestedMenuById } from "../../services/Menu.service";
import { AddToCart } from "../../services/Order.service";

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
  const [cart, cartItems] = addToCart(
    useShallow((state) => [state.addToCart, state.cartItems]),
  );
  const toast = useToast();
  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const maxLength = cartItems.length === 20;
    if (maxLength) {
      const id = "max-order";
      !toast.isActive(id) &&
        toast({
          id,
          title: "Maximum order is 20 items. Please adjust your order.",
          containerStyle: {
            marginTop: "80px",
            fontSize: "12px",
          },
          status: "error",
          position: "top",
          isClosable: true,
        });
    } else {
      getNestedMenuById(_id, (res) => {
        const data = res.product[0];
        const dataProduct = {
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          quantity: 1,
        };

        AddToCart(dataProduct, (status, res) => {
          if (status === true) {
            setIsLoading(false);
            console.log(res);
            cart(dataProduct);

            const id = "success-order";
            !toast.isActive(id) &&
              toast({
                id,
                title: res.data.message,
                containerStyle: {
                  marginTop: "80px",
                },
                status: "success",
                position: "top",
                duration: 1500,
                isClosable: true,
              });
          } else {
            console.log(res);
            const id = "error-fetching";
            !toast.isActive(id) &&
              toast({
                id,
                title: res.data.message,
                containerStyle: {
                  marginTop: "80px",
                },
                status: "error",
                position: "top",
                duration: 1500,
                isClosable: true,
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
              <>
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
              </>
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
                <>
                  <Plus />
                  <h1>Add To Cart</h1>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailProduct;
