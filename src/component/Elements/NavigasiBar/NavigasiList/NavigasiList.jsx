import { Link } from "react-router-dom";

const NavigasiList = ({ classnameLi, classnameA }) => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/menu" },
    { name: "PRODUCT", link: "" },
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
