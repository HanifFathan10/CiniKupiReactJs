import React, { Fragment, useEffect, useState } from "react";
import { getImageMenu } from "../../../../services/Menu.service";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";

const ProductItems = ({ productId }) => {
  const [image, setImage] = useState([]);
  const ProductId = productId;

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default ProductItems;
