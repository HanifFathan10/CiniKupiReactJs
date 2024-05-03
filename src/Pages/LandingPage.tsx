import * as React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import LandingFirst from "../component/Fragment/LandingFirst";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeroSection from "../component/Elements/HeroSection/HeroSection";
import UIpromo from "../component/Fragment/UIpromo";

const LandingPage = () => {
  return (
    <>
      <HeadMetaData title="Home" metaDescription="Home Page by CiniKupi" />
      <AuthLayouth>
        <HeroSection />
        <LandingFirst title="Best Product" />
        <UIpromo />
      </AuthLayouth>
    </>
  );
};

export default LandingPage;
