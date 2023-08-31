import React from "react";
import { Link } from "react-router-dom";

const NavigasiList = ({ classnameLi, classnameA }) => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "PRODUCT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  return (
    <>
      {Links.map((href) => (
        <li className={classnameLi} key={href.name}>
          <Link to={href.link} className={classnameA}>
            {href.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavigasiList;
