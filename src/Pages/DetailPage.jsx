import React from "react";
import DetailProducts from "../component/Fragment/DetailProducts";
import AuthDetail from "../component/Layouts/AuthDetail";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const DetailPage = () => {
  return (
    <>
      <HeadMetaData title="Detail Product" metaDescription="Detail Product By CiniKupi" />
      <AuthDetail>
        <DetailProducts />
      </AuthDetail>
    </>
  );
};

export default DetailPage;
