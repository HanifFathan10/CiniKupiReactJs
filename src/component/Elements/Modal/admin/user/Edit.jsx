import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Select } from "@chakra-ui/react";

const Edit = ({ updated, setUpdated, handleEditUser }) => {
  return Object.keys(updated).length ? (
    <ModalInput onClose={() => setUpdated({})}>
      <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
        <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
            onClick={() => setUpdated({})}
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleEditUser}>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="focus:ring-blue-5000 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500"
                defaultValue={updated.username}
                placeholder="Username"
                disabled
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:ring-blue-5000 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500"
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
                defaultValue={updated.role}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </Select>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-yellow-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <PencilSquareIcon className="mr -ml-1 mr-1 h-5 w-5" />
            Edit
          </button>
        </form>
      </div>
    </ModalInput>
  ) : null;
};

export default Edit;
