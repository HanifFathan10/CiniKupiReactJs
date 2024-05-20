import React from "react";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import AdminLayouts from "../../component/Layouts/AdminLayouts";
import { RefreshToken } from "../../services/AuthService";

const AdminPage = () => {
  return (
    <React.Fragment>
      <HeadMetaData title="Admin" description="Admin" />
      <AdminLayouts>
        <div className="h-screen rounded-md bg-[#f1f5f9] p-3 text-black">
          <h1>Ini Admin</h1>
        </div>
      </AdminLayouts>
    </React.Fragment>
  );
};

export default AdminPage;
