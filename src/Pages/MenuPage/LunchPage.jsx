import React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const LunchPage = () => {
  return (
    <>
      <HeadMetaData title="Lunch" metaDescription="Lunch Page by CiniKupi" />
      <AuthMenu title="Lunch">
        <FragmentMenu productId="66365df67c2424bf5153b3b2" />
      </AuthMenu>
    </>
  );
};

export default LunchPage;
