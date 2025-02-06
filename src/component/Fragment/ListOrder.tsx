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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-200">
      {count > 0 ? (
        <React.Fragment>
          {Array.isArray(items) &&
            items.map((cart, index) => {
              return <Cart key={index} product={cart} />;
            })}
        </React.Fragment>
      ) : (
        <NoProductUI />
      )}
    </div>
  );
};

export default ListOrder;
