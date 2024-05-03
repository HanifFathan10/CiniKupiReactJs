import * as React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Logout } from "../../../../services/AuthService";
import ConfirmLogout from "../ConfirmLogout";

type TLinks = {
  name: string;
  link: string;
};

const NavigasiList = () => {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    onClose;
    Logout((data) => {
      if (data === true) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("PAYMENT_RESULT");
        localStorage.removeItem("ADD_TO_CART");
        window.location.href = "/";
      }
    });
  };

  const token = localStorage.getItem("access_token");

  const Links: TLinks[] = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/menu" },
    ...(token ? [{ name: "ORDER", link: "/menu/cart" }] : []),
    ...(token ? [{ name: "HISTORY", link: "/history-transaction" }] : []),
  ].filter((link): link is TLinks => link !== null);

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
        <div className="my-2 flex items-center justify-center rounded-full bg-green px-4 py-1 md:mx-4">
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
