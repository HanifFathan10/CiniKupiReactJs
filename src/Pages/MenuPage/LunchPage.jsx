import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const LunchPage = () => {
  return (
    <>
      <HeadMetaData title="Lunch" metaDescription="Lunch Page by CiniKupi" />
      <AuthMenu title="Lunch">
        <FragmentMenu id="lunch" productId="6541fa151400956ab5b78bb8" />
      </AuthMenu>
    </>
  );
};

export default LunchPage;
