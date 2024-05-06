import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const BakeryPage = () => {
  return (
    <>
      <HeadMetaData title="Bakery" metaDescription="Bakery Menu by CiniKupi" />
      <AuthMenu title="Bakery">
        <FragmentMenu productId="66365de67c2424bf5153b3b0" />
      </AuthMenu>
    </>
  );
};

export default BakeryPage;
