import React, { useEffect, useState } from "react";
import ProductItems from "../Elements/Menu/ProductItems/ProductItems";
import { getAllMenuProduct } from "../../services/product.service";
import BreadCrumbMenu from "../Elements/BreadCrumb/BreadCrumbMenu";

interface FragmentMenuProps {
  nameUrl: string;
}

const FragmentMenu = ({ nameUrl }: FragmentMenuProps) => {
  const [products, setProducts] = useState<TDataProductWithMenu[]>([]);
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

  const findCategory = products.find((prod) => {
    return prod.id_menu.nameurl === nameUrl;
  });

  return (
    <section className="mt-10">
      <BreadCrumbMenu
        linkMenu={findCategory ? findCategory.id_menu.category! : "Menu"}
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
