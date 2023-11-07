import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const BakeryPage = () => {
  return (
    <>
      <HeadMetaData title="Bakery" metaDescription="Bakery Menu by CiniKupi" />
      <AuthMenu title="Bakery">
        <FragmentMenu id="bakery" productId="6541f97d1400956ab5b78b9c" />
      </AuthMenu>
    </>
  );
};

export default BakeryPage;
