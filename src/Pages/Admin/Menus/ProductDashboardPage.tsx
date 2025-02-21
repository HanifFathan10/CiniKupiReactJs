import React, { useEffect, useState } from "react";
import { getAllMenuProduct } from "../../../services/product.service";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { truncateText } from "../../../Hooks/useTruncateText";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Plus from "../../../component/Elements/Icon/Plus";
import { useDebounce } from "use-debounce";
import Pagination from "../../../component/Elements/Pagination/Pagination";
import useSearchTrim from "../../../Hooks/useSearchTrim";
import Create from "../../../component/Elements/Modal/admin/product/Create";
import Show from "../../../component/Elements/Modal/admin/product/Show";
import { rupiah } from "../../../utils/rupiah";
import Edit from "../../../component/Elements/Modal/admin/product/Edit";
import Delete from "../../../component/Elements/Modal/admin/product/Delete";
import { GetAllMenu } from "../../../services/menu.service";

const ProductDashboardPage = () => {
  const [images, setImages] = useState<File | null>(null);
  const [imageEdit, setImageEdit] = useState<File | null>(null);
  const [page, setPage] = useState<number>(1);
  const [show, setShow] = useState<TDataSingleProduct>({});
  const [deleted, setDeleted] = useState<TDataSingleProduct>({});
  const [updated, setUpdated] = useState<TDataSingleProduct>({});
  const [totalPages, setTotalPages] = useState<Pagination>({} as Pagination);
  const [products, setProducts] = useState<TDataSingleProduct[]>([]);
  const [menus, setMenus] = useState<TDataMenu[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { trimSearch, setTrimSearch, trimmedValue, handleSubmitChange } =
    useSearchTrim();
  const [debouncedSearch] = useDebounce(trimmedValue, 800);

  useEffect(() => {
    fetchDataProduct();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllMenu((status, res) => {
        if (status === true) {
          setMenus(res.data);
        }
      });
    };

    fetchData();
  }, [create, updated]);

  const fetchDataProduct = async () => {
    setLoading(true);

    try {
      const data = {
        page,
        limit: 10,
        search: debouncedSearch,
        status: "",
        time: "",
      };
      await getAllMenuProduct((status, res) => {
        if (status === true) {
          setProducts(res.data.data);
          setTotalPages(res.data);
          setLoading(false);
        }
      }, data);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrimSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <HeadMetaData
        title="Product Dashboard"
        metaDescription="Product dashboard"
      />
      <AdminLayouts>
        <div className="relative flex h-full flex-col justify-between overflow-x-auto bg-white p-3 shadow-md sm:rounded-lg">
          <div>
            <header className="flex justify-between p-4">
              <form className="flex gap-4" onSubmit={handleSubmitChange}>
                <label htmlFor="search-product" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search-product"
                    type="text"
                    value={trimSearch}
                    onChange={handleSearchProduct}
                    className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                    placeholder="Search for product name"
                  />
                </div>
              </form>
              <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <button
                  type="button"
                  onClick={() => setCreate(true)}
                  className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-700"
                >
                  <Plus />
                  Add New Product
                </button>
              </div>
            </header>

            <table className="w-full table-auto border-collapse text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Menu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <td>
                      <img
                        src="/images/logo.png"
                        alt="logo"
                        width={0}
                        height={0}
                        loading="lazy"
                        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                      />
                      <span className="sr-only">Loading...</span>
                    </td>
                  </tr>
                ) : (
                  <React.Fragment>
                    {products.map(
                      (product: TDataSingleProduct, index: number) => {
                        const itemNumber =
                          (totalPages.current_page! - 1) * 10 + index + 1;
                        return (
                          <tr
                            className="w-full border-b bg-white hover:bg-gray-50"
                            key={index}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {itemNumber}
                            </td>
                            <td
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                            >
                              {product.name}
                            </td>
                            <td
                              scope="row"
                              className="whitespace-nowrap px-6 py-4"
                            >
                              <img
                                src={product.image}
                                alt={product.image}
                                width={100}
                                height={100}
                                className="h-12 w-12 rounded bg-cover bg-center object-contain"
                              />
                            </td>
                            <td
                              scope="row"
                              className="whitespace-nowrap px-6 py-4"
                            >
                              {product.menu_id?.name}
                            </td>
                            <td
                              scope="row"
                              className="whitespace-nowrap px-6 py-4"
                            >
                              {rupiah(product.price)}
                            </td>
                            <td scope="row" className="px-6 py-4">
                              {truncateText(product.description!, 10)}
                            </td>
                            <td className="flex items-center justify-center px-4 py-3">
                              <Menu>
                                <MenuButton as="button">
                                  <EllipsisHorizontalIcon className="h-6 w-6" />
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
                        );
                      },
                    )}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            paginate={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </AdminLayouts>

      {/* MODAL */}
      <Create
        create={create}
        setCreate={setCreate}
        images={images}
        menus={menus}
        setImages={setImages}
        fetchDataProduct={fetchDataProduct}
        key={Math.random()}
      />

      <Show show={show} setShow={setShow} />

      <Edit
        imageEdit={imageEdit}
        setImageEdit={setImageEdit}
        fetchDataProduct={fetchDataProduct}
        updated={updated}
        setUpdated={setUpdated}
        menus={menus}
        key={Math.random()}
      />

      <Delete
        deleted={deleted}
        setDeleted={setDeleted}
        fetchDataProduct={fetchDataProduct}
        key={Math.random()}
      />
    </React.Fragment>
  );
};

export default ProductDashboardPage;
