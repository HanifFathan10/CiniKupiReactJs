import React from "react";
import PromoRight from "../Elements/Promo/PromoRight";
import PromoLeft from "../Elements/Promo/PromoLeft";

const UIpromo = () => {
  return (
    <React.Fragment>
      <PromoRight
        image="images/promo1.webp"
        title="Coffe or Drinks"
        description="Make your choice at CiniKupi from the various menu options here."
        button="Order Now"
        alt="promo1"
        to="/menu"
        key="promo1"
        background="bg-[#103322]"
      />
      <PromoLeft
        image="images/promo3.webp"
        title="Try it Now!!!"
        description="New Arrival from Ice Coffe. Restore your mood with an Ice Creamy Latte"
        button="Order Now"
        alt="promo3"
        to="/product/6561b24c79bc5ce3ec10a9b8"
        key="promo3"
        background="bg-[#22413b]"
      />
      <PromoRight
        image="images/promo2.webp"
        title="You Are hungry? there we are!!"
        description="there are lots of heavy meals, snacks and breakfast menus. Try it soon!!"
        button="Order Now"
        alt="promo2"
        to="/menu"
        key="promo2"
        background="bg-[#392b2c]"
      />
    </React.Fragment>
  );
};

export default UIpromo;
