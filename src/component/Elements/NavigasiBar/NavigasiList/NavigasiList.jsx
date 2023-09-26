import { Link } from "react-router-dom";

const NavigasiList = ({ classnameLi, classnameA }) => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/" },
    { name: "PRODUCT", link: "/" },
    { name: "CONTACT", link: "/contact" },
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
