import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const DessertPage = () => {
  return (
    <>
      <HeadMetaData title="Dessert" metaDescription="Dessert Page by CiniKupi" />
      <AuthLayouth>
        <LandingFirst title="Dessert">
          <ListImages type="dessert" />
        </LandingFirst>
        <ProdakSlide type="dessert" />
      </AuthLayouth>
    </>
  );
};

export default DessertPage;
