import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CreateDataMenu,
  DeleteDataMenu,
  EditDataMenu,
  GetAllMenu,
} from "../../../services/Menu.service";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Plus from "../../../component/Elements/Icon/Plus";
import Create from "../../../component/Elements/Modal/admin/menu/Create";
import Edit from "../../../component/Elements/Modal/admin/menu/Edit";
import Delete from "../../../component/Elements/Modal/admin/menu/Delete";
import { useCustomToast } from "../../../Hooks/useToast";

const MenuDashboardPage = () => {
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [updated, setUpdated] = useState({});
  const [deleted, setDeleted] = useState({});
  const [menus, setMenus] = useState([]);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { SuccessToast } = useCustomToast();

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
        SuccessToast({
          id: "create-menu",
          title: res.message,
        });
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
        SuccessToast({
          id: "edit-menu",
          title: res.message,
        });
      }
    });
  };

  const handleDeleteMenu = async (_id) => {
    await DeleteDataMenu(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
        fetchDataMenu();
        SuccessToast({
          id: "delete-menu",
          title: res.message,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Product Dashboard" description="Product dashboard" />
      <AdminLayouts>
        <div className="relative h-full overflow-y-auto bg-white p-3 shadow-md sm:rounded-lg">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full max-w-xs">
              <form>
                <label htmlFor="underline_select" className="sr-only">
                  Filter Menu
                </label>
                <select
                  id="underline_select"
                  onChange={handleCategoryChange}
                  value={category}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
                >
                  <option value="">All</option>
                  <option value="food">Food</option>
                  <option value="drinks">Drinks</option>
                  <option value="coffe beans">Coffe Beans</option>
                </select>
              </form>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <button
                type="button"
                onClick={() => setModal(true)}
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                <Plus />
                Add menu
              </button>
            </div>
          </div>
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Menu
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Name Url
                </th>
                <th scope="col" className="px-4 py-3">
                  Last Update
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <td>
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      width="20"
                      height="20"
                      loading="eager"
                      className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                    />
                    <span className="sr-only">Loading...</span>
                  </td>
                </tr>
              ) : (
                <React.Fragment>
                  {menus.map((menu, i) => {
                    const lastUpdate = formatDistanceToNow(menu.updatedAt, {
                      addSuffix: true,
                      locale: id,
                    });

                    return (
                      <tr className="border-b" key={i}>
                        <th
                          scope="row"
                          className="flex items-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        >
                          <img
                            src={menu.image}
                            alt={menu.name}
                            className="mr-3 h-10 w-auto bg-cover bg-center object-contain"
                          />
                          {menu.name}
                        </th>
                        <td className="px-4 py-3">{menu.category}</td>
                        <td className="px-4 py-3">{menu.nameurl}</td>
                        <td className="px-4 py-3">{lastUpdate}</td>
                        <td className="flex items-center justify-center gap-3 px-4 py-3">
                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-primary-300"
                            onClick={() => setUpdated(menu)}
                          >
                            <PencilSquareIcon className="-ml-1 mr-1 h-5 w-5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                            onClick={() => setDeleted(menu)}
                          >
                            <TrashIcon className="-ml-1 mr-1 h-5 w-5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayouts>

      <Create
        handleCreateMenu={handleCreateMenu}
        modal={modal}
        setModal={setModal}
        images={images}
        setImages={setImages}
        key={Math.random()}
      />

      <Edit
        handleEditMenu={handleEditMenu}
        setUpdated={setUpdated}
        updated={updated}
      />

      <Delete
        deleted={deleted}
        handleDeleteMenu={handleDeleteMenu}
        setDeleted={setDeleted}
        key={Math.random()}
      />
    </React.Fragment>
  );
};

export default MenuDashboardPage;
