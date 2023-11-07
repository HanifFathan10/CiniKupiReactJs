import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const HotCoffePage = () => {
  return (
    <>
      <HeadMetaData title="Hot Coffe" metaDescription="Hot Coffe by CiniKupi" />
      <AuthMenu title="Hot Coffe">
        <FragmentMenu productId="653f44753850af139e29ad08" />
      </AuthMenu>
    </>
  );
};

export default HotCoffePage;
