import React from "react";
import AuthDetail from "../component/Layouts/AuthDetail";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import DetailMenu from "../component/Fragment/DetailMenu";

const DetailPage = () => {
  return (
    <>
      <HeadMetaData title="Detail Menu" metaDescription="Detail Menu By CiniKupi" />
      <AuthDetail>
        <DetailMenu />
      </AuthDetail>
    </>
  );
};

export default DetailPage;
