import React, { useEffect } from "react";
import ProductItems from "../Elements/Menu/ProductItems/ProductItems";
import BreadCrumbMenu from "../Elements/BreadCrumb/BreadCrumbMenu";
import useProductStore from "../../Store/ProductStore";

interface FragmentMenuProps {
  nameUrl: string;
}

const FragmentMenu = ({ nameUrl }: FragmentMenuProps) => {
  const [products, getDataProduct, isLoading] = useProductStore((state) => [
    state.products,
    state.getDataProduct,
    state.isLoading,
  ]);

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <section className="mt-10">
      <BreadCrumbMenu
        linkMenu={"Menu"}
        hrefMenu={"/menu"}
        LinkProduct={nameUrl}
        nameUrl={nameUrl}
      />
      <hr aria-hidden="true" className="pb-7" />
      <ProductItems
        nameUrl={nameUrl}
        isLoading={isLoading}
        products={products}
      />
    </section>
  );
};

export default FragmentMenu;
