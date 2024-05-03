import * as React from "react";
import AuthMenu from "../../component/Layouts/AuthMenu";
import FragmentMenu from "../../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";

const Snack = () => {
  return (
    <>
      <HeadMetaData
        title="Snack & Sweet"
        metaDescription="Snack & Sweet Page by CiniKupi"
      />
      <AuthMenu title="Snack & Sweet">
        <FragmentMenu productId="6541fa671400956ab5b78bc3" />
      </AuthMenu>
    </>
  );
};

export default Snack;
