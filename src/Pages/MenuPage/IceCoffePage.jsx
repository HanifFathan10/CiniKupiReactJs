import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const IceCoffePage = () => {
  return (
    <>
      <HeadMetaData title="Ice Coffe" metaDescription="Ice Coffe by CiniKupi" />
      <AuthMenu title="Ice Coffe">
        <FragmentMenu productId="653f472784d040c4408205fc" />
      </AuthMenu>
    </>
  );
};

export default IceCoffePage;
