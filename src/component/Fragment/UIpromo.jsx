import React from "react";
import PromoRight from "../Elements/Promo/PromoRight";
import PromoLeft from "../Elements/Promo/PromoLeft";

const UIpromo = () => {
  return (
    <>
      <PromoRight image="images/promo1.webp" title="Coffe or Drinks" description="Make your choice at CiniKupi from the various menu options here." button="Order Now" alt="promo1" key="promo1" />
      <PromoLeft image="images/promo1.webp" title="Coffe or Drinks" description="Make your choice at CiniKupi from the various menu options here." button="Order Now" alt="promo1" key="promo2" />
    </>
  );
};

export default UIpromo;
