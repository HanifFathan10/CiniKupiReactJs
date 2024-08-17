import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthMenu from "../component/Layouts/AuthMenu";
import MenuProducts from "../component/Elements/Menu/MenuProducts/MenuProducts";
import { GetAllMenu } from "../services/Menu.service";

const Menu = () => {
  const [menus, setMenus] = useState<TDataMenu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllMenu((status, res) => {
        if (status === true) {
          setMenus(res.data);
          setIsLoading(false);
        }
      });
    };
    fetchData();
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
