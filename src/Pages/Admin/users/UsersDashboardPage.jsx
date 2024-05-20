import React, { useEffect } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { Select } from "@chakra-ui/react";
import {
  DeleteDataUser,
  UpdateDataUser,
  getAllDataUser,
} from "../../../services/AuthService";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import InputForm from "../../../component/Elements/InputForm";
import ModalInput from "../../../component/Elements/InputForm/Modal";

const UserDashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [updated, setUpdated] = React.useState({});
  const [deleted, setDeleted] = React.useState({});

  useEffect(() => {
    getAllDataUser((status, res) => {
      if (status === true) {
        setUsers(res.data);
      }
    });
  }, [updated, deleted]);

  const handleEditUser = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };

    await UpdateDataUser(data, (status, res) => {
      if (status === true) {
        setUpdated({});
      }
    });
  };

  const handleDeleteUser = async (_id) => {
    await DeleteDataUser(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" description="users dashboard" />
      <AdminLayouts>
        <div className="h-full w-full rounded-s-xl bg-white p-5 text-black">
          <table className="min-w-full table-auto rounded-md text-center text-sm font-light">
            <thead className="border-b border-dark font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  No
                </th>
                <th scope="col" className="px-6 py-4">
                  Username
                </th>

                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Role
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr className="border-b border-neutral-200" key={index}>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.role}
                    </td>
                    <td className="flex justify-center gap-3 whitespace-nowrap  px-6 py-4">
                      <button
                        className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setUpdated(user)}
                      >
                        <PencilSquareIcon className="h-6 w-6 text-black" />
                      </button>
                      <button
                        className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setDeleted(user)}
                      >
                        <TrashIcon className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayouts>
      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <h1 className="mb-6 text-xl font-bold">Edit Product</h1>
          <form onSubmit={handleEditUser}>
            <div className="grid gap-x-4 md:grid-cols-2">
              <InputForm
                htmlfor="username"
                placehoder="username"
                type="text"
                name="username"
                id="username"
                defaultValue={updated.username}
                disabled={true}
              >
                Username
              </InputForm>
              <InputForm
                htmlfor="email"
                placehoder="email"
                type="text"
                name="email"
                id="email"
                defaultValue={updated.email}
                disabled={true}
              >
                Email
              </InputForm>
              <div className="mb-4">
                <label htmlFor="role">Role</label>
                <Select defaultValue={updated.role} id="role" name="role">
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Select>
              </div>
            </div>
            <button
              className=" flex gap-1 rounded-md bg-yellow-400 px-5 py-3 font-bold"
              type="submit"
            >
              <PencilSquareIcon className="h-6 w-6" />
              Update
            </button>
          </form>
        </ModalInput>
      ) : null}
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <h1 className="mb-6 text-xl font-bold">Delete Product</h1>
          <p className="mb-6 font-semibold">
            Are you sure you want to delete this product?
          </p>
          <button
            className="flex gap-1 rounded-md bg-red-600 px-5 py-3 font-bold text-white"
            type="submit"
            onClick={() => handleDeleteUser(deleted._id)}
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default UserDashboardPage;
