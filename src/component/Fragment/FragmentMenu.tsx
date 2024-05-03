import * as React from "react";
import ProductItems from "../Elements/Menu/ProductItems/ProductItems";

const FragmentMenu = ({ productId }: { productId: string }) => {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl font-semibold">All Product</h2>
      <hr aria-hidden="true" className="pb-7" />
      <ProductItems productId={productId} />
    </section>
  );
};

export default FragmentMenu;
