import React from "react";

const NavigasiList = ({classnameLi, classnameA}) => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "PRODUCT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  return (
    <>
      {Links.map((Link) => (
        <li key={Link.name} className={classnameLi}>
          <a href={Link.link} className={classnameA}>
            {Link.name}
          </a>
        </li>
      ))}
    </>
  );
};

export default NavigasiList;
