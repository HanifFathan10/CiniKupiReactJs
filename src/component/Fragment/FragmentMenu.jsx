import React from "react";
import ProductItems from "../Elements/Menu/ProductItems/ProductItems";

const FragmentMenu = ({ nameUrl }) => {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl font-normal">All Product</h2>
      <hr aria-hidden="true" className="pb-7" />
      <ProductItems nameUrl={nameUrl} />
    </section>
  );
};

export default FragmentMenu;
