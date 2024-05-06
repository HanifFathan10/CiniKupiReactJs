import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { getAllMenuProduct } from "../../../../services/product.service";

const ProductItems = ({ productId }) => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllMenuProduct((status, data) => {
      if (status === true) {
        setMenus(data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <React.Fragment>
          {menus
            .filter((menu) => menu.id_menu === productId)
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
