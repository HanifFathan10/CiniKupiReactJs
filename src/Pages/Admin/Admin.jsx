import React from "react";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import AdminLayouts from "../../component/Layouts/AdminLayouts";

const AdminPage = () => {
  return (
    <React.Fragment>
      <HeadMetaData title="Admin" description="Admin" />
      <AdminLayouts>
        <div className="h-screen bg-[#f1f5f9] text-black">
          <h1>Ini Admin</h1>
        </div>
      </AdminLayouts>
    </React.Fragment>
  );
};

export default AdminPage;
