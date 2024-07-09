import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { Select } from "@chakra-ui/react";
import {
  DeleteDataUser,
  UpdateDataUser,
  getAllDataUser,
} from "../../../services/AuthService";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import { BoltIcon } from "@heroicons/react/24/solid";

const UserDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState({});
  const [deleted, setDeleted] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        fetchData();
      }
    });

    setIsUpdate(false);
  };

  const handleDeleteUser = async (_id) => {
    await DeleteDataUser(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
        fetchData();
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" description="users dashboard" />
      <AdminLayouts>
        <div className="relative h-full overflow-x-auto bg-white shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500">
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    width="20"
                    height="20"
                    fetchPriority="high"
                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                  />
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  {users.map((user, index) => {
                    return (
                      <tr class="border-b" key={index}>
                        <th
                          scope="row"
                          class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                          {index + 1}
                        </th>
                        <td class="px-6 py-4">{user.username}</td>
                        <td class="px-6 py-4">{user.email}</td>
                        <td class="px-6 py-4">{user.role}</td>
                        <td class="flex gap-4 px-6 py-4">
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-primary-300"
                            onClick={() => setUpdated(user)}
                          >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 "
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

      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900">Edit User</h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
                onClick={() => setUpdated({})}
              >
                <XMarkIcon className="h-5 w-5" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleEditUser}>
              <div class="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="username"
                    class="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="focus:ring-blue-5000 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500"
                    defaultValue={updated.username}
                    placeholder="Username"
                    disabled
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="focus:ring-blue-5000 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500"
                    defaultValue={updated.email}
                    placeholder="Menu"
                    disabled
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <Select
                    name="role"
                    id="role"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option disabled selected value={updated.role}>
                      {updated.role}
                    </option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </Select>
                </div>
              </div>
              <button
                type="submit"
                class="inline-flex items-center rounded-lg bg-yellow-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                <PencilSquareIcon className="mr -ml-1 mr-1 h-5 w-5" />
                Edit
              </button>
            </form>
          </div>
        </ModalInput>
      ) : null}
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <div class="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow sm:p-5">
            <button
              type="button"
              onClick={() => setDeleted({})}
              class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
            >
              <XMarkIcon className="h-5 w-5" />
              <span class="sr-only">Close modal</span>
            </button>
            <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p class="mb-4 text-gray-500 ">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-600">
                {deleted.username}
              </span>
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                onClick={() => setDeleted({})}
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                No, cancel
              </button>
              <button
                type="submit"
                class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 "
                onClick={() => handleDeleteUser(deleted._id)}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default UserDashboardPage;
