import React from "react";
import Sidebar from "../Fragment/Sidebar";

const AdminLayouts = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full justify-center bg-primary">
      <div className="flex h-screen w-full max-w-[1440px] overflow-hidden text-white">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-[999] flex h-20 w-full items-center bg-white px-5 py-10 drop-shadow-md">
            <h1 className="font-semibold text-black">Ini Dashboard Admin</h1>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminLayouts;
