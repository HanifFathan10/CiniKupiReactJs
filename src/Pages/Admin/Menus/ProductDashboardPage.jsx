import React, { useEffect, useState } from "react";
import {
  createProductMenu,
  deleteProductMenu,
  getAllMenuProduct,
  updateProductMenu,
} from "../../../services/product.service";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { rupiah } from "../../../Hooks/useRupiah";
import { truncateText } from "../../../Hooks/useTruncateText";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import { getImageMenu } from "../../../services/Menu.service";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import "flowbite";
import Plus from "../../../component/Elements/Icon/Plus";

const ProductDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [images, setImages] = useState("");
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState({});
  const [deleted, setDeleted] = useState({});
  const [updated, setUpdated] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = {
          currentPage,
          limit: 10,
          search: search,
        };
        await getAllMenuProduct(data, (status, res) => {
          if (status === true) {
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, search]);

  React.useEffect(() => {
    const fetchData = async () => {
      await getImageMenu((status, res) => {
        if (status === true) {
          setMenus(res);
        }
      });
    };

    fetchData();
  }, [modal, products]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      id_menu: e.target.menu.value,
      image: images,
      descriptions: e.target.descriptions.value,
      price: e.target.price.value,
      fat: e.target.fat.value,
      sugar: e.target.sugar.value,
      calories: e.target.calories.value,
      oz: e.target.oz.value,
    };

    await createProductMenu(data, (status, res) => {
      if (status === true) {
        setModal(false);
      }
    });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const data = {
      _id: updated._id,
      name: e.target.name.value,
      image: images || updated.image,
      id_menu: e.target.menu.value,
      descriptions: e.target.descriptions.value,
      price: e.target.price.value,
      fat: e.target.fat.value,
      sugar: e.target.sugar.value,
      calories: e.target.calories.value,
      oz: e.target.oz.value,
    };

    await updateProductMenu(data, (status, res) => {
      if (status === true) {
        setUpdated({});
      }
    });
  };

  const handleDeleteProduct = async ({ _id, id_menu }) => {
    const data = {
      _id,
      id_menu,
    };
    await deleteProductMenu(data, (status, res) => {
      if (status === true) {
        setDeleted({});
      }
    });
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];

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
        <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
          <header className="flex justify-between p-4">
            <div className="flex gap-4">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search for product name"
                />
              </div>
            </div>
            <div class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <button
                type="button"
                onClick={() => setModal(true)}
                class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Plus />
                Add New Product
              </button>
            </div>
          </header>

          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No
                </th>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Menu
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {loading ? (
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
                  {products.map((product, index) => (
                    <tr
                      class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td class="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td class="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="h-12 w-12 rounded bg-cover bg-center object-contain"
                        />
                      </td>
                      <td class="px-6 py-4">
                        {
                          menus.filter(
                            (menu) => menu._id === product.id_menu,
                          )[0].name
                        }
                      </td>
                      <td class="px-6 py-4">{rupiah(product.price)}</td>
                      <td class="px-6 py-4">
                        {truncateText(product.descriptions, 10)}
                      </td>
                      <td class="flex items-center justify-center px-4 py-3">
                        <Menu>
                          <MenuButton
                            as="button"
                            rightIcon={<ChevronDownIcon />}
                          >
                            <svg
                              class="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewbox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => setShow(product)}>
                              Detail
                            </MenuItem>

                            <MenuItem onClick={() => setUpdated(product)}>
                              Edit
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => setDeleted(product)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <nav
            class="flex-column flex flex-wrap items-center justify-between px-3 py-4 md:flex-row"
            aria-label="Table navigation"
          >
            <span class="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
              Showing{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                1-10 product
              </span>{" "}
              of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                {totalPages} page
              </span>
            </span>
            <ul class="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
              {currentPage > 1 && (
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    type="button"
                    class="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage == index + 1}
                    type="button"
                    className={`ms-0 flex h-8 cursor-pointer items-center justify-center border border-gray-300 ${
                      currentPage == index + 1
                        ? "bg-gray-300 text-gray-700"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    } px-3 leading-tight`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {currentPage < totalPages && (
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    type="button"
                    class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </AdminLayouts>

      {modal === true && (
        <ModalInput onClose={() => setModal(false)}>
          <div class="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Product
              </h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModal({})}
              >
                <XMarkIcon className="h-s5 w-5"></XMarkIcon>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div class="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label
                    for="menu"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Menus
                  </label>
                  <select
                    id="menu"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected>Choose a menu</option>
                    {menus.map((menu) => (
                      <option value={menu._id}>{menu.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    for="price"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  for="descriptions"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descriptions
                </label>
                <textarea
                  id="descriptions"
                  rows="4"
                  name="descriptions"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Write your descriptions here..."
                ></textarea>
              </div>
              <div class="mb-4 grid gap-4 sm:col-span-2 sm:grid-cols-4 md:gap-6">
                <div>
                  <label
                    for="calories"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    id="calories"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="12"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="sugar"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sugar
                  </label>
                  <input
                    type="number"
                    name="sugar"
                    id="sugar"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="105"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="fat"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fat
                  </label>
                  <input
                    type="number"
                    name="fat"
                    id="fat"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="15"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="oz"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Oz
                  </label>
                  <input
                    type="number"
                    name="oz"
                    id="oz"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="0"
                    required=""
                  />
                </div>
              </div>
              <div class="mb-4">
                <span class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Product Images
                </span>
                {images ? (
                  <div className="grid grid-cols-2 place-items-center">
                    <img
                      src={images}
                      alt={images}
                      className="w-32 bg-cover bg-center object-contain"
                    />
                    <div class="flex w-full items-center justify-center">
                      <label
                        for="dropzone-file"
                        class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            aria-hidden="true"
                            class="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={convertToBase64}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div class="flex w-full items-center justify-center">
                    <label
                      for="dropzone-file"
                      class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          aria-hidden="true"
                          class="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewbox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        onChange={convertToBase64}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div class="items-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <button
                  type="submit"
                  class="inline-flex w-full justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Create
                </button>
                <button
                  onClick={() => setModal({})}
                  type="button"
                  class="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:w-auto"
                >
                  <XMarkIcon className="mr-2 h-5 w-5" />
                  Discard
                </button>
              </div>
            </form>
          </div>
        </ModalInput>
      )}
      {Object.keys(show).length ? (
        <ModalInput onClose={() => setShow({})}>
          <div class="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div class="mb-4 flex justify-between rounded-t sm:mb-5">
              <div className="flex items-center gap-4">
                <div className="w-auto rounded-lg bg-gray-200 p-2">
                  <img
                    src={show.image}
                    alt={show.name}
                    width={100}
                    height={100}
                    className="h-16 w-16 bg-cover bg-center object-contain"
                  />
                </div>
                <div class="text-lg text-gray-900">
                  <h3 class="font-bold ">{show.name}</h3>
                  <p class="text-base font-semibold">{rupiah(show.price)}</p>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShow({})}
                >
                  <XMarkIcon class="h-6 w-6" />
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <dl>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Descriptions
              </dt>
              <dd class="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
                {show.descriptions}
              </dd>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Calories
                  </dt>
                  <dd class=" font-light text-gray-500 dark:text-gray-400">
                    {show.calories}
                  </dd>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Sugar
                  </dt>
                  <dd class=" font-light text-gray-500 dark:text-gray-400">
                    {show.sugar}
                  </dd>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Fat
                  </dt>
                  <dd class=" font-light text-gray-500 dark:text-gray-400">
                    {show.fat}
                  </dd>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100">
                  <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Oz
                  </dt>
                  <dd class=" font-light text-gray-500 dark:text-gray-400">
                    {show.oz}
                  </dd>
                </div>
              </dl>
            </dl>
          </div>
        </ModalInput>
      ) : null}
      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <div class="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div class="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Product
              </h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setUpdated({})}
              >
                <XMarkIcon className="h-s5 w-5"></XMarkIcon>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleEditProduct}>
              <div class="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Product name"
                    defaultValue={updated.name}
                  />
                </div>
                <div>
                  <label
                    for="menu"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Menus
                  </label>
                  <select
                    id="menu"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected disabled value={updated.id_menu}>
                      {
                        menus.filter((menu) => menu._id === updated.id_menu)[0]
                          .name
                      }
                    </option>
                    {menus.map((menu) => (
                      <option value={menu._id} name="menu">
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    for="price"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    defaultValue={updated.price}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  for="descriptions"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descriptions
                </label>
                <textarea
                  id="descriptions"
                  rows="4"
                  name="descriptions"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Write your descriptions here..."
                  defaultValue={updated.descriptions}
                ></textarea>
              </div>
              <div class="mb-4 grid gap-4 sm:col-span-2 sm:grid-cols-4 md:gap-6">
                <div>
                  <label
                    for="calories"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    id="calories"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="12"
                    defaultValue={updated.calories}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="sugar"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sugar
                  </label>
                  <input
                    type="number"
                    name="sugar"
                    id="sugar"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="105"
                    defaultValue={updated.sugar}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="fat"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fat
                  </label>
                  <input
                    type="number"
                    name="fat"
                    id="fat"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="15"
                    defaultValue={updated.fat}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="oz"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Oz
                  </label>
                  <input
                    type="number"
                    name="oz"
                    id="oz"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="0"
                    defaultValue={updated.oz}
                    required=""
                  />
                </div>
              </div>
              <div class="mb-4">
                <span class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Product Images
                </span>
                {images ? (
                  <div className="grid grid-cols-2 place-items-center">
                    <img
                      src={images}
                      alt={images}
                      className="w-32 bg-cover bg-center object-contain"
                    />
                    <div class="flex w-full items-center justify-center">
                      <label
                        for="dropzone-file"
                        class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            aria-hidden="true"
                            class="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          name="image"
                          onChange={convertToBase64}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 place-items-center">
                    <img
                      src={updated.image}
                      alt={updated.image}
                      className="w-32 bg-cover bg-center object-contain"
                    />
                    <div class="flex w-full items-center justify-center">
                      <label
                        for="dropzone-file"
                        class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            aria-hidden="true"
                            class="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          name="image"
                          onChange={convertToBase64}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div class="items-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <button
                  type="submit"
                  class="inline-flex w-full justify-center rounded-lg bg-yellow-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
                >
                  <PencilSquareIcon className="mr-2 h-5 w-5" />
                  Edit
                </button>
                <button
                  onClick={() => setUpdated({})}
                  type="button"
                  class="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:w-auto"
                >
                  <XMarkIcon className="mr-2 h-5 w-5" />
                  Discard
                </button>
              </div>
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
                onClick={() =>
                  handleDeleteProduct({
                    _id: deleted._id,
                    id_menu: deleted.id_menu,
                  })
                }
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

export default ProductDashboardPage;
