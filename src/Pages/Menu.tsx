import React, { useEffect } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthMenu from "../component/Layouts/AuthMenu";
import MenuProducts from "../component/Elements/Menu/MenuProducts/MenuProducts";
import useMenuStore from "../Store/MenuProduct";

const Menu = () => {
  const [menus, getDataMenu, isLoading] = useMenuStore((state) => [
    state.menus,
    state.getDataMenu,
    state.isLoading,
  ]);

  useEffect(() => {
    getDataMenu();
  }, []);
  return (
    <>
      <HeadMetaData title="Menu" metaDescription={"Menu page by CiniKupi"} />
      <AuthMenu title="Menu">
        <MenuProducts
          title="Drinks"
          id="drinks"
          menus={menus}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Foods"
          id="foods"
          menus={menus}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Coffe Beans"
          id="beans"
          menus={menus}
          isLoading={isLoading}
        />
      </AuthMenu>
    </>
  );
};

export default Menu;
