import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const LandingPage = () => {
  return (
    <>
      <HeadMetaData metaDescription="Home Page by CiniKupi" />
      <AuthLayouth>
        <LandingFirst title="Best Product">
          <ListImages type="default" />
        </LandingFirst>
        <ProdakSlide type="default" />
      </AuthLayouth>
    </>
  );
};

export default LandingPage;
