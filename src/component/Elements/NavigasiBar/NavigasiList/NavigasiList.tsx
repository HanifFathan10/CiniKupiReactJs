import { useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import ConfirmLogout from "../ConfirmLogout";
import useAuthStore from "../../../../Store/AuthStore";

const NavigasiList = () => {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useAuthStore((state) => state.logout);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const data = {
    token: sessionStorage.getItem("access_token") as string,
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await logout((status, res) => {
      if (status) {
        Navigate("/login", {
          preventScrollReset: true,
          replace: true,
        });
      }
    });
  };

  const Links = [
    { name: "HOME", link: "/" },
    { name: "MENU", link: "/menu" },
    data.token ? { name: "ORDER", link: "/menu/cart" } : null,
    data.token ? { name: "HISTORY", link: "/history-transaction" } : null,
  ].filter((link) => link !== null);

  return (
    <React.Fragment>
      {Links.map((href) => (
        <li className="my-2 md:mx-4" key={href.name}>
          <Link
            to={href.link}
            className="relative inline cursor-pointer rounded border-teriary text-sm font-bold before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:bg-teriary before:transition before:duration-300 before:ease-in-out hover:rounded-b-none hover:before:origin-bottom-left hover:before:scale-x-100 lg:px-4 lg:py-2"
          >
            {href.name}
          </Link>
        </li>
      ))}
      {data.token ? (
        <li>
          <button
            onClick={onOpen}
            className="my-2 flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-red-500 md:mx-4 md:px-6 md:py-3"
          >
            LOGOUT
          </button>
        </li>
      ) : (
        <li>
          <button
            onClick={() => Navigate("/login")}
            className="my-2 flex items-center justify-center rounded-full bg-teriary px-4 py-2 text-sm font-semibold  transition-all duration-300 ease-in-out hover:bg-teriary/90 md:mx-4 md:px-6 md:py-3"
          >
            LOGIN
          </button>
        </li>
      )}
      <ConfirmLogout
        cancelRef={cancelRef}
        handleLogout={handleLogout}
        isOpen={isOpen}
        onClose={onClose}
      />
    </React.Fragment>
  );
};

export default NavigasiList;
