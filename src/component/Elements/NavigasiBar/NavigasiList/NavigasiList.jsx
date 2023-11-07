import { Link } from "react-router-dom";

const NavigasiList = ({ classnameLi, classnameA }) => {
  document.getElementById("menu");
  const Links = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/menu" },
    { name: "PRODUCT", link: "#product" },
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
