import React from "react";
import { addToCart } from "../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import Cart from "../Elements/CartOrder/Cart";
import NoProductUI from "../Elements/CartOrder/NoProductUI";

const ListOrder = ({ count }) => {
  const cartItems = addToCart(useShallow((state) => state.cartItems));
  return (
    <div className="bg-[#eaeaea] min-h-screen w-full flex flex-col items-center justify-center">
      {count >= 1 ? (
        <>
          {Array.isArray(cartItems) &&
            cartItems.map((cart, index) => {
              const dataProduct = {
                id: cart.id,
                name: cart.name,
                price: cart.price,
                image: cart.image,
                quantity: 1,
              };
              return (
                <Cart
                  key={index}
                  product={cart}
                  removeById={dataProduct}
                  qty={dataProduct}
                />
              );
            })}
        </>
      ) : (
        <NoProductUI />
      )}
    </div>
  );
};

export default ListOrder;
