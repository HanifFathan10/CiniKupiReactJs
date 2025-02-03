import React from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeroSection from "../component/Elements/HeroSection/HeroSection";
import UIpromo from "../component/Fragment/UIpromo";
import OurGallery from "../component/Fragment/OurGallery";

const LandingPage = () => {
  return (
    <>
      <HeadMetaData metaDescription="Home Page by CiniKupi" />
      <AuthLayouth>
        <HeroSection />
        <OurGallery />
        <UIpromo />
      </AuthLayouth>
    </>
  );
};

export default LandingPage;
