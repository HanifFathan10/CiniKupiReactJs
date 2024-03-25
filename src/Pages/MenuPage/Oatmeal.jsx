import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const Oatmeal = () => {
  return (
    <>
      <HeadMetaData
        title="Oatmeal & Yoghurt"
        metaDescription="Oatmeal & Yoghurt Page by CiniKupi"
      />
      <AuthMenu title="Oatmeal & Yoghurt">
        <FragmentMenu
          id="oatmeal-yoghurt"
          productId="6541fa341400956ab5b78bbe"
        />
      </AuthMenu>
    </>
  );
};

export default Oatmeal;
