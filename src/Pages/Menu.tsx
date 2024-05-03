import * as React from "react";
import { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthMenu from "../component/Layouts/AuthMenu";
import MenuProducts from "../component/Elements/Menu/MenuProducts/MenuProducts";
import { getImageMenu } from "../services/Menu.service";
import { Imenu } from "../Interface/itemsProduct";

const Menu = () => {
  const [menus, setMenus] = useState<Imenu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getImageMenu((status, data) => {
      if (status === true) {
        setMenus(data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <>
      <HeadMetaData title="Menu" metaDescription={"Menu page by CiniKupi"} />
      <AuthMenu title="Menu">
        <MenuProducts
          title="Drinks"
          id="drink"
          menus={menus}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Foods"
          id="food"
          menus={menus}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Coffe Beans"
          id="coffe"
          menus={menus}
          isLoading={isLoading}
        />
      </AuthMenu>
    </>
  );
};

export default Menu;
