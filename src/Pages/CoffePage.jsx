import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const CoffePage = () => {
  return (
    <>
      <HeadMetaData title="Coffe" metaDescription="Coffe Page By CiniKupi" />
      <AuthLayouth>
        <LandingFirst title="Coffe">
          <ListImages type="coffe" />
        </LandingFirst>
        <ProdakSlide type="coffe" />
      </AuthLayouth>
    </>
  );
};

export default CoffePage;
