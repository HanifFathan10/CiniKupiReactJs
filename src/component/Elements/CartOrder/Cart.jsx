import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { totalItems } from "../../../Store/TotalItems";
import { useOptimistic } from "../../../Hooks/useOptimistic";
import { useCustomToast } from "../../../Hooks/useToast";
import { useDebounce } from "use-debounce";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { rupiah } from "../../../utils/rupiah";
import { AddManyItemToCart } from "../../../services/Order.service";

const Cart = ({ product }) => {
  const [click, setClick] = useState(false);
  const [render, setRender] = useState(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const { useCount } = totalItems(
    useShallow((state) => ({
      useCount: state.useCount,
    })),
  );

  useEffect(() => {
    const fetchUseClict = async () => {
      if (click === true) {
        await useCount();
      }
    };

    fetchUseClict();
  }, [click]);

  const [optimisticQuantity, addOptimisticQuantity, revertOptimisticQuantity] =
    useOptimistic(product.quantity, (currentQuantity, newQuantity) => {
      if (
        currentQuantity + newQuantity > 8 ||
        currentQuantity + newQuantity < 0
      )
        return currentQuantity;
      return currentQuantity + newQuantity;
    });

  const [debounceQuantity] = useDebounce(optimisticQuantity, 1000, {
    leading: false,
    trailing: true,
  });

  const handleAddToCart = async () => {
    addOptimisticQuantity(1);
  };

  const handleRemoveItem = async () => {
    addOptimisticQuantity(-1);
  };

  useEffect(() => {
    if (!render) {
      setRender(true);
      return;
    }

    let newDataProduct = { ...product, quantity: debounceQuantity };

    try {
      const fetchDataProduct = async () => {
        await AddManyItemToCart(newDataProduct, (status, res) => {
          if (status === true) {
            setClick(true);
            SuccessToast({
              id: "add-to-cart",
              title: res.data.message,
            });
          } else {
            revertOptimisticQuantity();
            ErrorToast({
              id: "remove-from-cart",
              title: res.response.data.message,
            });
          }
        });
      };

      if (debounceQuantity > 8) {
        ErrorToast({
          id: "add-to-cart",
          title: "Maximum order is 8 items. Please adjust your order.",
        });
        revertOptimisticQuantity();
      } else {
        fetchDataProduct();
      }
    } catch (error) {
      revertOptimisticQuantity();
      ErrorToast({
        id: "remove-from-cart",
        title: error.response.data.message,
      });
    } finally {
      setClick(false);
    }

    return () => {
      setRender(false);
      setClick(false);
    };
  }, [debounceQuantity]);

  return (
    <section className="flex w-full justify-center px-4 py-2">
      <div className="grid w-full max-w-lg grid-flow-col items-center justify-start gap-3 rounded-lg bg-white px-5 py-3 shadow-md">
        <div className="flex h-24 w-24 items-center justify-center overflow-clip rounded-full border border-secondary bg-[#212121] md:h-32 md:w-32 lg:h-40 lg:w-40">
          <img src={product.image} className="w-16 md:w-24 lg:w-28" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold uppercase leading-normal sm:text-lg lg:text-xl">
            {product.name}
          </h1>
          <h3 className="full sm:text-md mb-1 flex w-fit gap-1 rounded text-sm text-neutral-700 lg:text-lg">
            {rupiah(product.price * debounceQuantity)}
          </h3>
          <div className="item-center flex gap-1 text-white">
            <button onClick={handleRemoveItem}>
              <MinusCircleIcon className="h-7 w-7 text-chocolate lg:h-9 lg:w-9" />
            </button>
            <h2 className="leading-10 text-black">{optimisticQuantity}</h2>
            <button onClick={handleAddToCart}>
              <PlusCircleIcon className="h-7 w-7 text-chocolate lg:h-9 lg:w-9" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
