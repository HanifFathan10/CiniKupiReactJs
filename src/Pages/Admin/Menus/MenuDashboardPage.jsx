import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { Select } from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import {
  CreateDataMenu,
  DeleteDataMenu,
  EditDataMenu,
  GetAllMenu,
} from "../../../services/Menu.service";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import useSlug from "../../../Hooks/useSlug";
import Plus from "../../../component/Elements/Icon/Plus";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MenuDashboardPage = () => {
  const [menus, setMenus] = useState([]);
  const [updated, setUpdated] = useState({});
  const [deleted, setDeleted] = useState({});
  const [images, setImages] = useState("");
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { inputText, slug, handleInputChange } = useSlug();

  useEffect(() => {
    setIsLoading(true);

    fetchDataMenu();
  }, [category]);

  const fetchDataMenu = async () => {
    const data = {
      category,
    };

    await GetAllMenu((status, res) => {
      if (status === true) {
        setMenus(res);
        setIsLoading(false);
      }
    }, data);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCreateMenu = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      image: images,
      category: e.target.category.value,
      nameurl: e.target.nameurl.value,
    };

    await CreateDataMenu(data, (status, res) => {
      if (status === true) {
        setModal(false);
      }
    });
  };

  const handleEditMenu = async (e) => {
    e.preventDefault();

    const data = {
      _id: updated._id,
      name: e.target.name.value,
      category: e.target.category.value,
      nameurl: e.target.nameurl.value,
    };

    await EditDataMenu(data, (status, res) => {
      if (status === true) {
        setUpdated({});
        fetchDataMenu();
      }
    });
  };

  const handleDeleteMenu = async (_id) => {
    await DeleteDataMenu(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
        fetchDataMenu();
      }
    });
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (file.size > maxSize) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages(reader.result);
    };

    reader.onerror = (error) => {
      return;
    };
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Product Dashboard" description="Product dashboard" />
      <AdminLayouts>
        <div class="h-full overflow-y-auto bg-white p-3 shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div class="w-full max-w-xs">
              <form>
                <label for="underline_select" class="sr-only">
                  Filter Menu
                </label>
                <select
                  id="underline_select"
                  onChange={handleCategoryChange}
                  value={category}
                  class="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
                >
                  <option selected value="">
                    All
                  </option>
                  <option value="food">Food</option>
                  <option value="drinks">Drinks</option>
                  <option value="coffe beans">Coffe Beans</option>
                </select>
              </form>
            </div>
            <div class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <button
                type="button"
                onClick={() => setModal(true)}
                class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Plus />
                Add menu
              </button>
            </div>
          </div>
          <table class="h-fit w-full text-left text-sm text-gray-500">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">
                  Menu
                </th>
                <th scope="col" class="px-4 py-3">
                  Category
                </th>
                <th scope="col" class="px-4 py-3">
                  Name Url
                </th>
                <th scope="col" class="px-4 py-3">
                  Last Update
                </th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div class="absolute flex w-full items-center justify-center">
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
                  {menus.map((menu, i) => {
                    const lastUpdate = formatDistanceToNow(menu.updatedAt, {
                      addSuffix: true,
                      locale: id,
                    });
                    return (
                      <tr class="border-b dark:border-gray-700" key={i}>
                        <th
                          scope="row"
                          class="flex items-center whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                        >
                          <img
                            src={menu.image}
                            alt={menu.name}
                            class="mr-3 h-10 w-auto bg-cover bg-center object-contain"
                          />
                          {menu.name}
                        </th>
                        <td class="px-4 py-3">{menu.category}</td>
                        <td class="px-4 py-3">{menu.nameurl}</td>
                        <td class="px-4 py-3">{lastUpdate}</td>
                        <td class="flex items-center justify-center gap-3 px-4 py-3">
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-yellow-300 dark:focus:ring-primary-800"
                            onClick={() => setUpdated(menu)}
                          >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            class="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => setDeleted(menu)}
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

      {modal === true && (
        <ModalInput onClose={() => setModal(false)}>
          <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add Menu
              </h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModal(false)}
              >
                <XMarkIcon className="h-5 w-5" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleCreateMenu}>
              <div class="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={inputText}
                    onChange={handleInputChange}
                    id="name"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Menu"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="nameurl"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name Url
                  </label>
                  <input
                    type="text"
                    id="disabled-input"
                    aria-label="disabled input"
                    name="nameurl"
                    class="focus:ring-blue-500s mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-slate-400 focus:border-blue-500"
                    value={slug}
                    placeholder="Menu url"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <Select
                    name="category"
                    id="category"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option disabled selected>
                      Select Category
                    </option>
                    <option value="drinks">Drinks</option>
                    <option value="foods">Foods</option>
                    <option value="coffe beans">Coffe Beans</option>
                  </Select>
                </div>
                <div>
                  <div className="flex w-full flex-col items-start justify-center">
                    <label
                      htmlFor="dropzone-file"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    {images ? (
                      <img
                        src={images}
                        alt="image"
                        className="h-32 w-full rounded-lg bg-cover object-contain"
                      />
                    ) : (
                      <label
                        for="dropzone-file"
                        class="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={convertToBase64}
                          required
                          name="image"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Plus />
                Add new product
              </button>
            </form>
          </div>
        </ModalInput>
      )}

      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Menu
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
            <form onSubmit={handleEditMenu}>
              <div class="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    id="name"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    defaultValue={updated.name}
                    placeholder="Menu"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="nameurl"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name Url
                  </label>
                  <input
                    type="text"
                    id="nameurl"
                    aria-label="nameurl"
                    name="nameurl"
                    class="focus:ring-blue-500s mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-slate-400 focus:border-blue-500"
                    value={slug}
                    placeholder="Menu url"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <Select
                    name="category"
                    id="category"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option disabled selected value={updated.category}>
                      {updated.category}
                    </option>
                    <option value="drinks">Drinks</option>
                    <option value="foods">Foods</option>
                    <option value="coffe beans">Coffe Beans</option>
                  </Select>
                </div>
                <div>
                  <div className="flex w-full flex-col items-start justify-center">
                    <label
                      htmlFor="dropzone-file"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
              <span className="font-bold text-neutral-600">{deleted.name}</span>
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
                onClick={() => handleDeleteMenu(deleted._id)}
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

export default MenuDashboardPage;
