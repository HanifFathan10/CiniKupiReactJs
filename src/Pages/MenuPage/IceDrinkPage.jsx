import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const IceDrinkPage = () => {
  return (
    <>
      <HeadMetaData
        title="Ice Drinks"
        metaDescription="Ice Drinks Page by CiniKupi"
      />
      <AuthMenu title="Ice Drinks">
        <FragmentMenu productId="66365dd67c2424bf5153b3ae" />
      </AuthMenu>
    </>
  );
};

export default IceDrinkPage;
