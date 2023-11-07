import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import LandingFirst from "../component/Fragment/LandingFirst";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeroSection from "../component/Elements/HeroSection/HeroSection";

const LandingPage = () => {
  return (
    <>
      <HeadMetaData metaDescription="Home Page by CiniKupi" />
      <AuthLayouth>
        <HeroSection />
        <LandingFirst title="Best Product"></LandingFirst>
      </AuthLayouth>
    </>
  );
};

export default LandingPage;
