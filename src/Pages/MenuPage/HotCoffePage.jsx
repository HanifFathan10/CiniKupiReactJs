import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const HotCoffePage = () => {
  return (
    <>
      <HeadMetaData title="Hot Coffe" metaDescription="Hot Coffe by CiniKupi" />
      <AuthMenu title="Hot Coffe">
        <FragmentMenu productId="66364f6edc5d335619bd1944" />
      </AuthMenu>
    </>
  );
};

export default HotCoffePage;
