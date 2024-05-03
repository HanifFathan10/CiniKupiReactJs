import * as React from "react";
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
        <FragmentMenu productId="653f480b84d040c44082060b" />
      </AuthMenu>
    </>
  );
};

export default HotDrinkPage;
