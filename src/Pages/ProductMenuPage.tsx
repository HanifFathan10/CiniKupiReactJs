import React from "react";
import AuthMenu from "../component/Layouts/AuthMenu";
import FragmentMenu from "../component/Fragment/FragmentMenu";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import { useParams } from "react-router-dom";

const ProductMenuPage = () => {
  const { name } = useParams();
  return (
    <>
      <HeadMetaData title="Hot Coffe" metaDescription="Hot Coffe by CiniKupi" />
      <AuthMenu title={name!}>
        <FragmentMenu nameUrl={name!} />
      </AuthMenu>
    </>
  );
};

export default ProductMenuPage;
