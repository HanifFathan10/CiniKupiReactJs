import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useSlug from "../../../../../Hooks/useSlug";
import { Select } from "flowbite-react";
import { EditDataMenu } from "../../../../../services/Menu.service";
import { useCustomToast } from "../../../../../Hooks/useToast";

interface ModalEditMenuProps {
  updated: TDataMenu;
  setUpdated: React.Dispatch<React.SetStateAction<TDataMenu>>;
  fetchDataMenu: () => void;
}

const Edit = ({ updated, setUpdated, fetchDataMenu }: ModalEditMenuProps) => {
  const { slug, handleInputChange } = useSlug();
  const { SuccessToast, ErrorToast } = useCustomToast();

  const handleEditMenu = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      _id: updated._id,
      name: e.target.menu.value,
      category: e.target.category.value,
      nameurl: e.target.nameurl.value,
    };

    await EditDataMenu(data, (status, res) => {
      if (status === true) {
        setUpdated({});
        fetchDataMenu();
        SuccessToast({
          id: "edit-menu",
          title: res.message,
        });
      } else {
        ErrorToast({
          id: "error-edit-menu",
          title: res.message,
        });
      }
    });
  };

  return Object.keys(updated).length ? (
    <ModalInput onClose={() => setUpdated({})}>
      <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
        <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
          <h3 className="text-lg font-semibold text-gray-900 ">Edit Menu</h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setUpdated({})}
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleEditMenu}>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="menu"
                onChange={handleInputChange}
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                defaultValue={updated.name}
                placeholder="Menu"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameurl"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Name Url
              </label>
              <input
                type="text"
                id="nameurl"
                aria-label="nameurl"
                name="nameurl"
                className="focus:ring-blue-500s mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-slate-400 focus:border-blue-500"
                value={slug ? slug : updated.nameurl}
                placeholder="Menu url"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Category
              </label>
              <Select
                name="category"
                id="category"
                defaultValue={updated.category}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option disabled value={updated.category}>
                  {updated.category}
                </option>
                <option value="drinks">Drink</option>
                <option value="food">Food</option>
                <option value="coffe beans">Coffe Beans</option>
              </Select>
            </div>
            <div>
              <div className="flex w-full flex-col items-start justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Image
                </label>
                <img
                  src={updated.image}
                  alt="image"
                  className="h-32 w-full rounded-lg bg-cover object-contain"
                />
              </div>
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
