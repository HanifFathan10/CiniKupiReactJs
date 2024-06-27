import React, { useEffect } from "react";
import Cart from "../Elements/CartOrder/Cart";
import NoProductUI from "../Elements/CartOrder/NoProductUI";
import { useShallow } from "zustand/react/shallow";
import { totalItems } from "../../Store/TotalItems";

const ListOrder = () => {
  const [count, items, useCount] = totalItems(
    useShallow((state) => [state.count, state.items, state.useCount]),
  );

  useEffect(() => {
    useCount();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#eaeaea]">
      {count > 0 ? (
        <React.Fragment>
          {Array.isArray(items) &&
            items.map((cart, index) => {
              const dataProduct = {
                _id: cart._id,
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
                  removeById={dataProduct._id}
                  data={dataProduct}
                />
              );
            })}
        </React.Fragment>
      ) : (
        <NoProductUI />
      )}
    </div>
  );
};

export default ListOrder;
