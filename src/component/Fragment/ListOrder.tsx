import * as React from "react";
import { useEffect } from "react";
import Cart from "../Elements/CartOrder/Cart";
import NoProductUI from "../Elements/CartOrder/NoProductUI";
import { useShallow } from "zustand/react/shallow";
import { ItotalItems } from "../../Interface/zustand";
import { totalItems } from "../../Store/TotalItems";

const ListOrder = () => {
  const { count, items, useCount } = totalItems(
    useShallow((state: ItotalItems) => ({
      count: state.count,
      items: state.items,
      useCount: state.useCount,
    })),
  );

  useEffect(() => {
    // Memanggil useCount ketika ada perubahan pada properti items
    useCount();
  }, []);

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center bg-[#eaeaea]">
      {count > 0 ? (
        <>
          {Array.isArray(items) &&
            items.map((cart, index) => {
              const dataProduct = {
                _id: cart?._id,
                id: cart?.id,
                name: cart?.name,
                price: cart?.price,
                image: cart?.image,
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
        </>
      ) : (
        <NoProductUI />
      )}
    </div>
  );
};

export default ListOrder;
