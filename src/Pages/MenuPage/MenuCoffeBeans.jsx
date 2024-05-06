import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const MenuCoffeBeans = () => {
  return (
    <>
      <HeadMetaData
        title="Coffe Beans"
        metaDescription="Coffe Beans Page by CiniKupi"
      />
      <AuthMenu title="Coffe Beans">
        <FragmentMenu id="coffe-beans" productId="66365e267c2424bf5153b3b8" />
      </AuthMenu>
    </>
  );
};

export default MenuCoffeBeans;
