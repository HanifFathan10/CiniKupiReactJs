import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const IceDrinkPage = () => {
  return (
    <>
      <HeadMetaData title="Ice Drinks" metaDescription="Ice Drinks Page by CiniKupi" />
      <AuthMenu title="Ice Drinks">
        <FragmentMenu productId="653f48b384d040c440820611" />
      </AuthMenu>
    </>
  );
};

export default IceDrinkPage;
