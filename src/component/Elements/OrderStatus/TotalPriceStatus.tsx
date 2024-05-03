import * as React from "react";
import { Fragment } from "react";
import { IitemsProduct } from "../../../Interface/itemsProduct";

const TotalPriceStatus = ({ trx }: { trx: IitemsProduct[] }) => {
  return (
    <Fragment>
      {trx.map((product: IitemsProduct, i: number) => (
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

export default TotalPriceStatus;
