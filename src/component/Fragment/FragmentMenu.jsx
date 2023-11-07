import React from "react";
import ProductItems from "../Elements/Menu/ProductItems/ProductItems";

const FragmentMenu = ({ productId }) => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-5">All Product</h2>
      <hr aria-hidden="true" className="pb-7" />
      <ProductItems productId={productId}/>
    </section>
  );
};

export default FragmentMenu;
