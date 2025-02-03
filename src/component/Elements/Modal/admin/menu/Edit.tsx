import React, { useState } from "react";
import ModalInput from "../../../InputForm/Modal";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useSlug from "../../../../../Hooks/useSlug";
import { EditDataMenu } from "../../../../../services/menu.service";
import { useCustomToast } from "../../../../../Hooks/useToast";
import { Select } from "@chakra-ui/react";

interface ModalEditMenuProps {
  categories: TDataCategory[];
  updated: TDataMenu;
  setUpdated: React.Dispatch<React.SetStateAction<TDataMenu>>;
  fetchDataMenu: () => void;
}

const Edit = ({
  categories,
  updated,
  setUpdated,
  fetchDataMenu,
}: ModalEditMenuProps) => {
  const { slug, handleInputChange } = useSlug();
  const { SuccessToast, ErrorToast } = useCustomToast();

  const handleEditMenu = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      _id: updated._id,
      name: e.target.menu.value,
      category_id: e.target.category.value,
      nameUrl: e.target.nameUrl.value,
    };

    await EditDataMenu(data, (status, res) => {
      if (status === true) {
        setUpdated({} as TDataMenu);
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
    <ModalInput onClose={() => setUpdated({} as TDataMenu)}>
      <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
        <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
          <h3 className="text-lg font-semibold text-gray-900 ">Edit Menu</h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setUpdated({} as TDataMenu)}
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
                className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
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
                id="nameUrl"
                aria-label="nameUrl"
                name="nameUrl"
                className="focus:ring-blue-500s mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-slate-400 focus:border-blue-500"
                value={slug ? slug : updated.nameUrl}
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
                defaultValue={updated.category_id?.name}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                required
              >
                <option disabled defaultValue={updated.category_id?.name}>
                  {updated.category_id?.name}
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
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
                  width={0}
                  height={0}
                  loading="lazy"
                  draggable={false}
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
