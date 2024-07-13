import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useSlug from "../../../../../Hooks/useSlug";
import { Select } from "@chakra-ui/react";
import { convertToBase64 } from "../../../../../utils/convertToBase64";
import Plus from "../../../Icon/Plus";

const Create = ({ modal, setModal, handleCreateMenu, images, setImages }) => {
  const { inputText, slug, handleInputChange } = useSlug();

  return (
    modal === true && (
      <ModalInput onClose={() => setModal(false)}>
        <div className="rounded-md bg-white p-4 shadow-md drop-shadow-md">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 ">Add Menu</h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => setModal(false)}
            >
              <XMarkIcon className="h-5 w-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleCreateMenu}>
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
                  name="name"
                  value={inputText}
                  onChange={handleInputChange}
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 "
                  placeholder="Menu"
                  required=""
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
                  id="disabled-input"
                  aria-label="disabled input"
                  name="nameurl"
                  className="focus:ring-blue-500s mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-slate-400 focus:border-blue-500"
                  value={slug}
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  required
                  defaultValue=""
                >
                  <option disabled value="">
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
                    className="mb-2 block text-sm font-medium text-gray-900 "
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
                      htmlFor="dropzone-file"
                      className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => convertToBase64(e, setImages)}
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
              className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
            >
              <Plus />
              Add new product
            </button>
          </form>
        </div>
      </ModalInput>
    )
  );
};

export default Create;
