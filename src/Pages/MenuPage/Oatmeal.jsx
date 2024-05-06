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
        <FragmentMenu productId="66365e077c2424bf5153b3b4" />
      </AuthMenu>
    </>
  );
};

export default Oatmeal;
