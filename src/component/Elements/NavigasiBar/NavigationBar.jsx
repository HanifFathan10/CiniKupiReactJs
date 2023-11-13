import React from "react";
import Navigasi from "./Navigasi";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import axios from "axios";

const NavigationBar = ({ classname, color }) => {
  const Navigate = useNavigate();
  const handleLogout = async () => {
    await axios
      .post("https://cini-kupi-react-js-api.vercel.app/api/v1/logout", "", { withCredentials : true })
      .then((res) => {
        Navigate("/login");
        localStorage.removeItem("accessToken");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={`shadow-md bg-transparent w-full fixed top-0 left-0 z-[9999] ${classname}`}>
      <div className="flex items-center w-[90%] justify-between md:w-full md:justify-between py-4 px-7 md:px-10">
        <div className="flex gap-2 text-lg">
          <Logo color={color} />
        </div>
        <Navigasi />
        <span className="flex justify-center items-center">
          <Button onClick={handleLogout} background="uppercase hover:text-red-500 transition duration-300 text-lg bg-transparent hover:bg-transparent font-bold" text="Logout"></Button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NavigationBar;
