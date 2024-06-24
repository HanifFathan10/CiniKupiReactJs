import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { getAllMenuProduct } from "../../../../services/product.service";

const ProductItems = ({ nameUrl }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllMenuProduct((status, res) => {
        if (status === true) {
          setProducts(res.data.products);
          setIsLoading(false);
        }
      });
    };

    fetchData();
  }, []);
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
