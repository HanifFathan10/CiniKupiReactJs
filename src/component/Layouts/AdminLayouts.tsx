import React, { useEffect } from "react";
import Sidebar from "../Fragment/Sidebar";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AdminLayouts = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const TOKEN = sessionStorage.getItem("access_token")!;
  const { data }: any = jwtDecode(TOKEN);

  useEffect(() => {
    if (data.role !== "admin") {
      navigate("/", {
        preventScrollReset: true,
        replace: true,
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full justify-center bg-light-400">
      <div className="flex h-screen w-full max-w-[1440px] gap-4 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="flex h-20 w-full items-center rounded-es-xl bg-white px-5 py-10 drop-shadow-md">
            <div className="flex w-full justify-between">
              <h1 className="text-xl font-normal">
                Welcome back <span className="font-bold">{data.username}</span>
              </h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminLayouts;
