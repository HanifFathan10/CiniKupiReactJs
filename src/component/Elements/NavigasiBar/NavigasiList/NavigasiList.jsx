import { useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Logout } from "../../../../services/AuthService";
import ConfirmLogout from "../ConfirmLogout";

const NavigasiList = () => {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("access_token");

    await Logout(token, (status, res) => {
      if (status === true) {
        onClose;
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("PAYMENT_RESULT");
        localStorage.removeItem("ADD_TO_CART");
        window.location.href = "/";
      }
    });
  };

  const token = sessionStorage.getItem("access_token");

  const Links = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/menu" },
    token ? { name: "ORDER", link: "/menu/cart" } : null,
    token ? { name: "HISTORY", link: "/history-transaction" } : null,
  ].filter((link) => link !== null);

  return (
    <>
      {Links.map((href) => (
        <li className="my-2 md:mx-4" key={href.name}>
          <Link
            to={href.link}
            className="text-md px-2 font-semibold duration-500 hover:text-slate-600 max-md:text-[#ffffff]"
          >
            {href.name}
          </Link>
        </li>
      ))}
      {token ? (
        <div className="my-2 flex items-center justify-center rounded-full bg-orange-900 px-4 py-1 md:mx-4">
          <button onClick={onOpen} className="p-0 text-sm font-semibold">
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="my-2 flex items-center justify-center rounded-full bg-green-700 px-4 py-1 md:mx-4">
          <button
            onClick={() => Navigate("/login")}
            className="p-0 text-sm font-semibold"
          >
            LOG IN
          </button>
        </div>
      )}
      <ConfirmLogout
        cancelRef={cancelRef}
        handleLogout={handleLogout}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default NavigasiList;
