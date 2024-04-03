import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthMenu from "../component/Layouts/AuthMenu";
import MenuProducts from "../component/Elements/Menu/MenuProducts/MenuProducts";
import { getImageMenu } from "../services/Menu.service";

const Menu = () => {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImageMenu((data) => {
      setImage(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <HeadMetaData title="Menu" metaDescription={"Menu page by CiniKupi"} />
      <AuthMenu title="Menu">
        <MenuProducts
          title="Drinks"
          id="drink"
          image={image}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Foods"
          id="food"
          image={image}
          isLoading={isLoading}
        />
        <MenuProducts
          title="Coffe Beans"
          id="coffe"
          image={image}
          isLoading={isLoading}
        />
      </AuthMenu>
    </>
  );
};

export default Menu;
