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
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No
                </th>
                <th scope="col" class="px-6 py-3">
                  Username
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div class="absolute">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {users.map((user, index) => {
                    return (
                      <tr
                        class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                        key={index}
                      >
                        <th
                          scope="row"
                          class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td class="px-6 py-4">{user.username}</td>
                        <td class="px-6 py-4">{user.email}</td>
                        <td class="px-6 py-4">{user.role}</td>
                        <td class="flex gap-4 px-6 py-4">
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-yellow-300 dark:focus:ring-primary-800"
                            onClick={() => setUpdated(user)}
                          >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
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
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Edit User
              </h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
          <div class="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              onClick={() => setDeleted({})}
              class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
              <span class="sr-only">Close modal</span>
            </button>
            <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p class="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-600">
                {deleted.username}
              </span>
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                onClick={() => setDeleted({})}
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
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
