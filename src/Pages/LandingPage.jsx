import React, { useEffect } from "react";
import AuthLayouth from "../component/Layouts/AuthLayouth";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import LandingFirst from "../component/Fragment/LandingFirst";
import ListImages from "../component/Elements/ProductItems/ListImages/ListImages";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate()
  useEffect(()=> {
    const token = localStorage.getItem('accesToken')
    if (!token) {
      Navigate('/login')
    }
  }, [])
  return (
    <AuthLayouth>
      <LandingFirst title="Product">
        <ListImages type='default' />
      </LandingFirst>
      <ProdakSlide type="default" />
    </AuthLayouth>
  );
};

export default LandingPage;
