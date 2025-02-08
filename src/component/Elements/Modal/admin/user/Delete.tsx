import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCustomToast } from "../../../../../Hooks/useToast";
import { DeleteDataUser } from "../../../../../services/Auth.service";

interface DeleteUserProps {
  deleted: IDataUser;
  setDeleted: React.Dispatch<React.SetStateAction<IDataUser>>;
  fetchData: () => void;
}

const Delete = ({ deleted, setDeleted, fetchData }: DeleteUserProps) => {
  const { SuccessToast, ErrorToast } = useCustomToast();
  const handleDeleteUser = async (_id: string) => {
    await DeleteDataUser(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
        SuccessToast({
          id: "delete-user",
          title: res.message,
        });
        fetchData();
      } else {
        ErrorToast({
          id: "delete-user",
          title: res.message,
        });
      }
    });
  };

  return Object.keys(deleted).length ? (
    <ModalInput onClose={() => setDeleted({})}>
      <div className="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow sm:p-5">
        <button
          type="button"
          onClick={() => setDeleted({})}
          className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
        >
          <XMarkIcon className="h-5 w-5" />
          <span className="sr-only">Close modal</span>
        </button>
        <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-4 text-gray-500 ">
          Are you sure you want to delete{" "}
          <span className="font-bold text-neutral-600">{deleted.username}</span>
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setDeleted({})}
            type="button"
            className="focus:ring-primary-300 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4"
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 "
            onClick={() => handleDeleteUser(deleted._id!)}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </ModalInput>
  ) : null;
};

export default Delete;
