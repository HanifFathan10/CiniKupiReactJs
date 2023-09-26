import React from "react";
import DetailProducts from "../component/Fragment/DetailProducts";
import AuthDetail from "../component/Layouts/AuthDetail";

const DetailPage = () => {
  return (
    <AuthDetail>
      <DetailProducts />
    </AuthDetail>
  );
};

export default DetailPage;
