import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";
import { Imenu } from "../../../../Interface/itemsProduct";

const ProductItems = ({ productId }: { productId: string }) => {
  const [menus, setMenus] = useState<Imenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ProductId = productId;

  useEffect(() => {
    getImageMenu((status, data) => {
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
            .filter((menu) => menu._id === ProductId)
            .map((menu, index) => (
              <Fragment key={index}>
                {menu.product.map((result, index) => (
                  <Link key={index} to={`/product/${result._id}`}>
                    <Cart image={result.image} title={result.name} />
                  </Link>
                ))}
              </Fragment>
            ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductItems;
