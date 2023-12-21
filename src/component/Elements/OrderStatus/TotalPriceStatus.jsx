import React, { Fragment } from "react";

export const TotalPriceStatus = ({ trx }) => {
  return (
    <Fragment>
      {trx.item_details.map((product, i) => (
        <div className="flex justify-between" key={i}>
          <div className="flex gap-2 text-sm">
            <h3 className="font-bold">{`${product.quantity} x`}</h3>
            <h1>{product.name}</h1>
          </div>
          <h1 className="italic">Rp. {product.price}</h1>
        </div>
      ))}
    </Fragment>
  );
};
