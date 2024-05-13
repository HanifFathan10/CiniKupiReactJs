import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmLogout from "../Elements/NavigasiBar/ConfirmLogout";
import { Logout } from "../../services/AuthService";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleLogout = async (e) => {
    e.preventDefault();

    await Logout((status, res) => {
      if (status === true) {
        onClose;
        localStorage.removeItem("access_token");
        localStorage.removeItem("PAYMENT_RESULT");
        localStorage.removeItem("ADD_TO_CART");
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="back absolute left-0 top-0 z-[9999] flex h-screen w-72 -translate-x-full flex-col justify-between overflow-y-hidden rounded-e-xl border-4 border-solid bg-light-200 px-5 py-3 text-black duration-300 ease-linear lg:static lg:translate-x-0">
      <div>
        <Link to={"/admin"} className="flex w-full items-end gap-2 p-3">
          <svg
            fill="#081225"
            height="30px"
            width="30px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 425.762 425.762"
            xmlSpace="preserve"
            className="stroke-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="10"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="square"
              strokeLinejoin="inherit"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M424.938,360.253c-1.585-3.657-5.19-6.023-9.176-6.023h-90.591c9.831-10.514,18.209-22.385,24.735-35.159 c11.113-21.758,16.749-45.262,16.749-69.86c0-5.523-4.478-10-10-10H69.103c-5.522,0-10,4.477-10,10 c0,4.156,0.175,8.277,0.496,12.367h-24.96c-6.708,0-13.002,2.611-17.711,7.338c-4.731,4.732-7.338,11.022-7.338,17.711 c0,26.286,21.38,47.67,47.66,47.67h27.536c4.705,7.056,10.002,13.729,15.802,19.933H10c-3.985,0-7.591,2.367-9.176,6.023 c-1.584,3.657-0.847,7.906,1.879,10.814c19.007,20.284,45.851,31.917,73.648,31.917H349.41c27.797,0,54.641-11.633,73.648-31.917 C425.784,368.16,426.522,363.91,424.938,360.253z M29.589,286.627c0-1.347,0.525-2.615,1.494-3.583 c0.941-0.946,2.204-1.466,3.555-1.466h27.859c2.405,11.249,6.087,22.179,11.028,32.72H57.249 C41.997,314.297,29.589,301.884,29.589,286.627z M79.466,259.211h266.825c-2.732,37.482-20.782,71.547-50.553,95.019h-165.72 C100.248,330.758,82.197,296.693,79.466,259.211z M349.41,382.985H76.352c-12.784,0-25.318-3.069-36.558-8.755h346.173 C374.728,379.916,362.195,382.985,349.41,382.985z"></path>{" "}
                <path d="M145.989,131.572l51.064,24.204c15.341,7.271,25.243,22.328,25.843,39.293c0.191,5.399,4.628,9.647,9.987,9.646 c0.12,0,0.24-0.002,0.36-0.006c5.52-0.195,9.835-4.828,9.641-10.347c-0.865-24.464-15.145-46.174-37.265-56.659l-51.064-24.204 c-17.468-8.28-24.942-29.227-16.663-46.694c4.011-8.462,11.077-14.855,19.896-18.002c8.82-3.147,18.336-2.672,26.798,1.339 c4.993,2.367,10.954,0.238,13.319-4.753c2.365-4.991,0.237-10.954-4.753-13.319c-13.288-6.299-28.236-7.045-42.087-2.103 c-13.851,4.943-24.947,14.983-31.246,28.272C106.818,85.672,118.557,118.569,145.989,131.572z"></path>{" "}
                <path d="M231.852,52.583c13.909-13.424,36.146-13.027,49.57,0.881c13.408,13.893,13.03,36.094-0.832,49.523l-36.009,33.749 c-4.029,3.777-4.234,10.105-0.457,14.135c1.968,2.101,4.63,3.162,7.298,3.162c2.451,0,4.907-0.896,6.837-2.704l36.065-33.802 c0.035-0.034,0.07-0.067,0.105-0.101c21.845-21.082,22.465-56.005,1.383-77.85s-56.006-22.465-77.85-1.383 c-3.974,3.835-4.087,10.166-0.251,14.14C221.546,56.306,227.879,56.418,231.852,52.583z"></path>{" "}
                <path d="M201.273,195.224c4.628-3.014,5.937-9.209,2.923-13.837s-9.209-5.938-13.837-2.923 c-11.672,7.601-17.405,21.826-14.268,35.396l1.063,4.599c1.069,4.623,5.184,7.75,9.734,7.75c0.746,0,1.504-0.084,2.262-0.259 c5.381-1.245,8.734-6.615,7.49-11.996l-1.063-4.599C194.324,203.937,196.613,198.259,201.273,195.224z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <h1 className="text-lg font-bold leading-tight">CiniKupi Admin</h1>
        </Link>
        <hr className="border-[1px] border-dark/50" />
      </div>
      <ul className="flex flex-col gap-3">
        <li
          className={`rounded-md ${pathname === "/admin/users" ? "bg-dark text-white" : "text-dark"} p-3`}
        >
          <Link to="/admin/users" className="flex items-center gap-2">
            <UserIcon className="h-6 w-6" />
            <h2 className="font-semibold">Users</h2>
          </Link>
        </li>
        <Accordion
          animation="linear"
          allowToggle
          className="divide-x-2 divide-solid divide-dark"
        >
          <AccordionItem border={"none"}>
            <h2>
              <AccordionButton className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <h3 className="font-semibold">Menus</h3>
                </div>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <li
                className={`rounded-md ${pathname === "/admin/menus/menu" ? "bg-dark text-white" : ""} p-3`}
              >
                <Link
                  to="/admin/menus/menu"
                  className="flex items-center gap-2"
                >
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <h2 className="font-semibold">Menu</h2>
                </Link>
              </li>
              <li
                className={`rounded-md ${pathname === "/admin/menus/product" ? "bg-dark text-white" : ""} p-3`}
              >
                <Link
                  to="/admin/menus/product"
                  className="flex items-center gap-2"
                >
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <h2 className="font-semibold">Product</h2>
                </Link>
              </li>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <li
          className={`rounded-md ${pathname === "/admin/transactions" ? "bg-dark stroke-white text-white" : "stroke-dark text-dark"} p-3`}
        >
          <Link to="/admin/transactions" className="flex items-center gap-2">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.72827 19.7C7.54827 18.82 8.79828 18.89 9.51828 19.85L10.5283 21.2C11.3383 22.27 12.6483 22.27 13.4583 21.2L14.4683 19.85C15.1883 18.89 16.4383 18.82 17.2583 19.7C19.0383 21.6 20.4883 20.97 20.4883 18.31V7.04C20.4883 3.01 19.5483 2 15.7683 2H8.20828C4.42828 2 3.48828 3.01 3.48828 7.04V18.3C3.49828 20.97 4.95827 21.59 6.72827 19.7Z"
                  // stroke="#081225"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M9.25 10H14.75"
                  // stroke="#081225"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h2 className="font-semibold">Transactions</h2>
          </Link>
        </li>
      </ul>

      <button
        className="rounded-md bg-dark px-6 py-3 font-bold text-white shadow-md shadow-dark/50"
        onClick={onOpen}
      >
        Logout
      </button>
      <ConfirmLogout
        cancelRef={cancelRef}
        handleLogout={handleLogout}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default Sidebar;
