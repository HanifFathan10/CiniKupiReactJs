import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";

const ProductItems = ({ nameUrl, isLoading, products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <React.Fragment>
          {products
            .filter((menu) => menu.id_menu.nameurl === nameUrl)
            .map((menu, index) => {
              return (
                <Link key={index} to={`/product/${menu._id}`}>
                  <Cart image={menu.image} title={menu.name} />
                </Link>
              );
            })}
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductItems;
