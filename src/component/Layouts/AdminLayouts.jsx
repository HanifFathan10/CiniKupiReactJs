import React, { useEffect } from "react";
import Sidebar from "../Fragment/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const AdminLayouts = ({ children }) => {
  const navigate = useNavigate();
  const decode = sessionStorage.getItem("access_token")
    ? jwtDecode(sessionStorage.getItem("access_token"))
    : null;

  useEffect(() => {
    if (decode?.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full justify-center bg-light-400">
      <div className="flex h-screen w-full max-w-[1440px] gap-4 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="flex h-20 w-full items-center rounded-es-xl bg-white px-5 py-10 drop-shadow-md">
            <div className="flex w-full justify-between">
              <h1 className="font-semibold text-black">Ini Dashboard Admin</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminLayouts;
