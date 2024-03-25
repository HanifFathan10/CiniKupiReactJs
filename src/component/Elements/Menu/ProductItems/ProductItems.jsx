import React, { Fragment, useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import CartSkeleton from "../CartSkeleton";

const ProductItems = ({ productId }) => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ProductId = productId;

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <>
          {image
            .filter((img) => img._id === ProductId)
            .map((img, index) => (
              <Fragment key={index}>
                {img.product.map((result, index) => (
                  <Link key={index} to={`/product/${result._id}`}>
                    <Cart image={result.image} title={result.name} />
                  </Link>
                ))}
              </Fragment>
            ))}
        </>
      )}
    </div>
  );
};

export default ProductItems;
