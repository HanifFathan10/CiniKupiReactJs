import React from "react";
import Navigasi from "./Navigasi";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Logout } from "../../../services/AuthService";
import Entry from "../Icon/Entry";

const NavigationBar = ({ classname, color, background }) => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    Logout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("PAYMENT_RESULT");
      localStorage.removeItem("ADD_TO_CART");
    });
  };

  const token = localStorage.getItem("accessToken");
  const ButtonLogout = () => (
    <span className="flex justify-center items-center">
      <Button
        onClick={handleLogout}
        background="uppercase hover:text-red-500 transition duration-300 text-lg bg-transparent hover:bg-transparent font-bold"
        text="Logout"
      ></Button>
      <Entry />
    </span>
  );

  const ButtonLogin = () => (
    <span className="flex justify-center items-center">
      <Button
        onClick={() => Navigate("/login")}
        background="uppercase hover:text-secondary transition duration-300 text-lg bg-transparent hover:bg-transparent font-bold"
        text="Login"
      ></Button>
      <Entry />
    </span>
  );
  return (
    <div
      className={`shadow-md bg-transparent w-full fixed top-0 left-0 z-[9999] ${classname}`}
    >
      <div className="flex items-center w-[90%] justify-between md:w-full md:justify-between py-4 px-7 md:px-10">
        <div className="flex gap-2 text-lg">
          <Logo color={color} />
        </div>
        <Navigasi background={background} />
        {token ? <ButtonLogout /> : <ButtonLogin />}
      </div>
    </div>
  );
};

export default NavigationBar;
