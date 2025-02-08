import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { getAllDataUser } from "../../../services/Auth.service";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Edit from "../../../component/Elements/Modal/admin/user/Edit";
import Delete from "../../../component/Elements/Modal/admin/user/Delete";

const UserDashboardPage = () => {
  const [deleted, setDeleted] = useState<IDataUser>({});
  const [updated, setUpdated] = useState<IDataUser>({});
  const [users, setUsers] = useState<IDataUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllDataUser((status, res) => {
      if (status === true) {
        setUsers(res.data);
        setIsLoading(false);
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" metaDescription="users dashboard" />
      <AdminLayouts>
        <div className="relative h-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <td>
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      width="20"
                      height="20"
                      loading="lazy"
                      className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                    />
                    <span className="sr-only">Loading...</span>
                  </td>
                </tr>
              ) : (
                <>
                  {users.map((user, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="flex gap-4 px-6 py-4">
                          <button
                            type="button"
                            className="focus:ring-primary-300 inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4"
                            onClick={() => setUpdated(user)}
                          >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 "
                            onClick={() => setDeleted(user)}
                          >
                            <TrashIcon className="-ml-1 mr-1 h-5 w-5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayouts>

      <Edit
        setUpdated={setUpdated}
        updated={updated}
        fetchData={fetchData}
        key={Math.random()}
      />

      <Delete
        deleted={deleted}
        setDeleted={setDeleted}
        fetchData={fetchData}
        key={Math.random()}
      />
    </React.Fragment>
  );
};

export default UserDashboardPage;
