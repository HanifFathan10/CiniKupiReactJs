import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const DrinkPage = () => {
  return (
    <>
      <HeadMetaData title="Drink" metaDescription="Drink Page by CiniKupi" />
      <AuthLayouth>
        <LandingFirst title="Drink">
          <ListImages type="drink" />
        </LandingFirst>
        <ProdakSlide type="drink" />
      </AuthLayouth>
    </>
  );
};

export default DrinkPage;
