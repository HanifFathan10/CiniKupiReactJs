import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Plus from "../../../component/Elements/Icon/Plus";
import Create from "../../../component/Elements/Modal/admin/menu/Create";
import Edit from "../../../component/Elements/Modal/admin/menu/Edit";
import Delete from "../../../component/Elements/Modal/admin/menu/Delete";
import { GetAllMenu } from "../../../services/Menu.service";
import { GetAllCategory } from "../../../services/Category.service";

const MenuDashboardPage = () => {
  const [category, setCategory] = useState<string>("");
  const [updated, setUpdated] = useState<TDataMenu>({} as TDataMenu);
  const [deleted, setDeleted] = useState<TDataMenu>({} as TDataMenu);
  const [menus, setMenus] = useState<TDataMenu[]>([]);
  const [categories, setCategories] = useState<TDataCategory[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataMenu = async () => {
    await GetAllMenu((status, res) => {
      if (status === true) {
        setMenus(res.data);
        setIsLoading(false);
      }
    });
  };

  const fetchDataCategory = async () => {
    await GetAllCategory((status, res) => {
      if (status === true) {
        setCategories(res.data);
        setIsLoading(false);
      }
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchDataCategory();
    fetchDataMenu();
  }, [category]);

  return (
    <React.Fragment>
      <HeadMetaData
        title="Product Dashboard"
        metaDescription="Product dashboard"
      />
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
                className="focus:ring-primary-300 flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-500 focus:outline-none focus:ring-4"
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
                  _id
                </th>
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
                    const lastUpdate = formatDistanceToNow(menu.updatedAt!, {
                      addSuffix: true,
                      locale: id,
                    });

                    return (
                      <tr className="border-b" key={i}>
                        <td className="whitespace-nowrap px-4 py-3">
                          {menu._id}
                        </td>
                        <th
                          scope="row"
                          className="flex items-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        >
                          <img
                            src={menu.image as string}
                            alt={menu.name}
                            className="mr-3 h-10 w-auto bg-cover bg-center object-contain"
                          />
                          {menu.name}
                        </th>
                        <td className="px-4 py-3">{menu.category_id?.name}</td>
                        <td className="px-4 py-3">{menu.nameUrl}</td>
                        <td className="px-4 py-3">{lastUpdate}</td>
                        <td className="flex items-center justify-center gap-3 px-4 py-3">
                          <button
                            type="button"
                            className="focus:ring-primary-300 inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-2 py-2 text-center text-sm font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-4"
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
        categories={categories}
        modal={modal}
        setModal={setModal}
        fetchDataMenu={fetchDataMenu}
        key={Math.random()}
      />

      <Edit
        setUpdated={setUpdated}
        updated={updated}
        fetchDataMenu={fetchDataMenu}
        categories={categories}
        key={Math.random()}
      />

      <Delete
        deleted={deleted}
        setDeleted={setDeleted}
        fetchDataMenu={fetchDataMenu}
        key={Math.random()}
      />
    </React.Fragment>
  );
};

export default MenuDashboardPage;
