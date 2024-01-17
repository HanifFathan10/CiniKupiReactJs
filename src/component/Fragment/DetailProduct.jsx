import React from "react";
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
import { Link } from "react-router-dom";
import { getNestedMenuById } from "../../services/Menu.service";

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
  const [cart, cartItems] = addToCart(
    useShallow((state) => [state.addToCart, state.cartItems])
  );
  const toast = useToast();
  const handleAddToCart = (e) => {
    e.preventDefault();

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

        cart(dataProduct);
      });

      const id = "success-order";
      !toast.isActive(id) &&
        toast({
          id,
          title: "Success add to cart",
          containerStyle: {
            marginTop: "80px",
          },
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
    }
  };

  return (
    <React.Fragment>
      <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center">
        <div className="w-full h-full p-2 flex justify-center items-center mt-4">
          <div className="bg-dark h-44 w-44 md:w-52 md:h-52 rounded-full border border-secondary overflow-hidden flex items-center justify-center">
            <img src={image} className="w-[132px] bg-cover bg-center p-2" />
          </div>
        </div>
        <div className="flex w-full h-full flex-col justify-center max-md:items-center mt-10 md:mt-0 text-light">
          <h1 className="text-lg md:text-xl lg:text-3xl uppercase font-bold border-b-2 w-fit border-secondary">
            {name}
          </h1>
          <h2 className="text-lg md:text-2xl font-extralight my-2">
            {rupiah(price)}
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-light py-6 px-2 md:mt-10">
        <div className="md:w-4/5">
          <div className="w-fit border border-secondary flex justify-center items-center rounded full md:text-lg px-2 mb-4 text-secondary">
            <h1>200</h1>
            <SingleStar />
            <h1>Items</h1>
          </div>
          <div className="mb-4 max-w-xs md:max-w-sm">
            <p className="text-xs lg:text-base text-[#b2b4a1]">
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
                    className="text-black max-w-[190px] md:max-w-xs"
                    borderWidth="2px"
                    borderColor="#cba258"
                  >
                    <PopoverHeader className="font-medium leading-normal text-xs md:text-base">
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
          <div className="flex w-full justify-end">
            <Link
              onClick={handleAddToCart}
              className="bg-green py-3 mt-10 px-5 md:py-6 md:px-8 rounded-full font-semibold flex justify-center items-center shadow-xl hover:bg-[#4abd93] focus:ring-4 focus:ring-emerald-500 text-center"
            >
              <Plus />
              Add To Cart
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailProduct;
