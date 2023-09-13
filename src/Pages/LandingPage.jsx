import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";

const LandingPage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Product">
        <ListImages />
      </LandingFirst>
      <ProdakSlide />
    </AuthLayouth>
  );
};

export default LandingPage;
