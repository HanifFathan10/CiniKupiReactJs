import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const IceCoffePage = () => {
  return (
    <>
      <HeadMetaData title="Ice Coffe" metaDescription="Ice Coffe by CiniKupi" />
      <AuthMenu title="Ice Coffe">
        <FragmentMenu productId="66365da47c2424bf5153b3a9" />
      </AuthMenu>
    </>
  );
};

export default IceCoffePage;
