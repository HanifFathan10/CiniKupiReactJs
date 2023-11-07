import React from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthMenu from "../component/Layouts/AuthMenu";
import MenuProducts from "../component/Elements/Menu/MenuProducts/MenuProducts";

const Menu = () => {
  
  return (
    <>
      <HeadMetaData title="Menu" metaDescription={"Menu page by CiniKupi"} />
      <AuthMenu title="Menu">
          <MenuProducts title="Drinks" id="drink" />
          <MenuProducts title="Foods" id="food" />
          <MenuProducts title="Coffe Beans" id="coffe" />
      </AuthMenu>
    </>
  );
};

export default Menu;
