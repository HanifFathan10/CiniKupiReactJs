import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { convertToBase64 } from "../../../../../utils/convertToBase64";

const Create = ({
  modal,
  setModal,
  handleAddProduct,
  images,
  menus,
  setImages,
}) => {
  return (
    modal === true && (
      <ModalInput onClose={() => setModal(false)}>
        <div className="relative rounded-lg bg-white p-4 shadow  sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4  sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 ">
              Add New Product
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => setModal({})}
            >
              <XMarkIcon className="h-s5 w-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label
                  htmlFor="menu"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Menus
                </label>
                <select
                  id="menu"
                  name="menu"
                  defaultValue="Choose a menu"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                  {menus.map((menu, i) => (
                    <option value={menu._id} key={i}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="descriptions"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Descriptions
              </label>
              <textarea
                id="descriptions"
                rows="4"
                name="descriptions"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Write your descriptions here..."
              ></textarea>
            </div>
            <div className="mb-4 grid gap-4 sm:col-span-2 sm:grid-cols-4 md:gap-6">
              <div>
                <label
                  htmlFor="calories"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  id="calories"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                  placeholder="12"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="sugar"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Sugar
                </label>
                <input
                  type="number"
                  name="sugar"
                  id="sugar"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                  placeholder="105"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="fat"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Fat
                </label>
                <input
                  type="number"
                  name="fat"
                  id="fat"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                  placeholder="15"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="oz"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Oz
                </label>
                <input
                  type="number"
                  name="oz"
                  id="oz"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
                  placeholder="0"
                  required=""
                />
              </div>
            </div>
            <div className="mb-4">
              <span className="mb-2 block text-sm font-medium text-gray-900 ">
                Product Images
              </span>
              {images ? (
                <div className="grid grid-cols-2 place-items-center">
                  <img
                    src={images}
                    alt={images}
                    className="w-32 bg-cover bg-center object-contain"
                  />
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={convertToBase64}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        aria-hidden="true"
                        className="mb-3 h-10 w-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => convertToBase64(e, setImages)}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="items-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  sm:w-auto"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Create
              </button>
              <button
                onClick={() => setModal({})}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300  sm:w-auto"
              >
                <XMarkIcon className="mr-2 h-5 w-5" />
                Discard
              </button>
            </div>
          </form>
        </div>
      </ModalInput>
    )
  );
};

export default Create;
