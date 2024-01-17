import React, { useRef } from "react";
import Navigasi from "./Navigasi";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Logout } from "../../../services/AuthService";
import Entry from "../Icon/Entry";
import ConfirmLogout from "./ConfirmLogout";
import ArrowLogout from "../Icon/ArrowLogout";

const NavigationBar = ({ classname, color, background }) => {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleLogout = () => {
    onClose;
    Logout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("PAYMENT_RESULT");
      localStorage.removeItem("ADD_TO_CART");
      window.location.href = "/";
    });
  };

  const token = localStorage.getItem("accessToken");
  return (
    <>
      <div
        className={`shadow-md bg-transparent w-full fixed top-0 left-0 z-[9999] ${classname}`}
      >
        <div className="flex items-center w-[90%] justify-between md:w-full md:justify-between py-4 px-7 md:px-10">
          <div className="flex gap-2 text-lg">
            <Logo color={color} />
          </div>
          <Navigasi background={background} />

          {token ? (
            <Button
              colorScheme="white"
              rightIcon={<ArrowLogout />}
              onClick={onOpen}
            >
              LOGOUT
            </Button>
          ) : (
            <Button
              colorScheme="white"
              onClick={() => Navigate("/login")}
              rightIcon={<Entry />}
            >
              LOGIN
            </Button>
          )}
        </div>
      </div>
      <ConfirmLogout
        cancelRef={cancelRef}
        handleLogout={handleLogout}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default NavigationBar;
