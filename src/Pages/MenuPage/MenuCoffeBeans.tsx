import * as React from "react";
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
        <FragmentMenu productId="6541fa921400956ab5b78bc9" />
      </AuthMenu>
    </>
  );
};

export default MenuCoffeBeans;
