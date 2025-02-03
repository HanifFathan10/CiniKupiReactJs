import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";

interface ProductItemsProps {
  nameUrl: string;
  isLoading: boolean;
  products: TDataSingleProduct[];
}

const ProductItems = ({ nameUrl, isLoading, products }: ProductItemsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <React.Fragment>
          {products
            .filter((product) => product.menu_id?.nameUrl == nameUrl)
            .map((product, index) => {
              return (
                <Link key={index} to={`/product/${product._id}`}>
                  <Cart image={product.image} title={product.name} />
                </Link>
              );
            })}
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductItems;
