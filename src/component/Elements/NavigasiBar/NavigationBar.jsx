import React, { useEffect, useRef, useState } from "react";
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

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-[9999] w-full bg-transparent shadow-md ${classname}`}
      >
        <div className="flex w-[90%] items-center justify-between px-7 py-4 md:w-full md:justify-between md:px-10">
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
