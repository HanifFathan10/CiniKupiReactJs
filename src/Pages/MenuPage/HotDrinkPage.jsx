import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const HotDrinkPage = () => {
  return (
    <>
      <HeadMetaData
        title="Hot Drinks"
        metaDescription="Hot Drinks Page by CiniKupi"
      />
      <AuthMenu title="Hot Drinks">
        <FragmentMenu productId="66365dbf7c2424bf5153b3ac" />
      </AuthMenu>
    </>
  );
};

export default HotDrinkPage;
