import React from "react";
import {
  createProductMenu,
  deleteProductMenu,
  getAllMenuProduct,
  updateProductMenu,
} from "../../../services/product.service";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { Select } from "@chakra-ui/react";
import { rupiah } from "../../../Hooks/useRupiah";
import { truncateText } from "../../../Hooks/useTruncateText";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import InputForm from "../../../component/Elements/InputForm";
import { filterIdMenu } from "../../../Hooks/useFilterIdMenu";
import { getImageMenu } from "../../../services/Menu.service";
import Label from "../../../component/Elements/InputForm/Label";

const ProductDashboardPage = () => {
  const [products, setProducts] = React.useState([]);
  const [menus, setMenus] = React.useState([]);
  const [images, setImages] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [deleted, setDeleted] = React.useState({});
  const [updated, setUpdated] = React.useState({});

  React.useEffect(() => {
    getAllMenuProduct((status, res) => {
      if (status === true) {
        setProducts(res);
      }
    });
  }, [modal, deleted, updated]);

  React.useEffect(() => {
    const fetchData = async () => {
      await getImageMenu((status, res) => {
        if (status === true) {
          setMenus(res);
        }
      });
    };

    fetchData();
  }, [modal]);

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

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    await deleteProductMenu(
      { _id: deleted._id, id_menu: deleted.id_menu },
      (status, res) => {
        if (status === true) {
          setDeleted({});
        }
      },
    );
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
        <div className="flex flex-col gap-4 overflow-auto rounded-s-xl bg-white p-4">
          <button
            className="w-fit rounded-md bg-dark px-6 py-3 font-bold text-white"
            onClick={() => setModal(true)}
          >
            Add New Product
          </button>
          <table className="min-w-full table-auto rounded-md text-start text-sm font-light">
            <thead className="border-b border-solid border-dark font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  No
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Image
                </th>
                <th scope="col" className="px-6 py-4">
                  Menu
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Descriptions
                </th>
                <th scope="col" className="px-6 py-4">
                  Calories
                </th>
                <th scope="col" className="px-6 py-4">
                  Sugar
                </th>
                <th scope="col" className="px-6 py-4">
                  Fat
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr className="border-b border-dark" key={index}>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      <img
                        src={product.image}
                        alt="product image"
                        width={100}
                        height={100}
                        className="bg-cover bg-center object-contain"
                      />
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {filterIdMenu(product.id_menu)}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {rupiah(product.price)}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {truncateText(product.descriptions, 10)}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {" "}
                      {product.calories}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {product.sugar}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {product.fat}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      <button
                        className="mx-1 rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setUpdated(product)}
                      >
                        <PencilSquareIcon className="h-6 w-6 text-black" />
                      </button>
                      <button
                        className="mx-1 rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setDeleted(product)}
                      >
                        <TrashIcon className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayouts>
      {modal === true && (
        <ModalInput onClose={() => setModal(false)}>
          <h1 className="mb-4 font-bold">Create Product</h1>
          <form onSubmit={handleAddProduct}>
            <div className="flex w-full flex-col gap-x-4 md:grid md:grid-cols-2">
              <InputForm
                htmlfor={"name"}
                placehoder={"name"}
                type={"text"}
                name={"name"}
                id={"name"}
                className="w-full"
              >
                Name
              </InputForm>
              <div className=" flex flex-col gap-3">
                <label htmlFor="menu" className="font-semibold">
                  Menu
                </label>
                <Select name="menu" id="menu" required>
                  {menus.map((menu, index) => {
                    return (
                      <option key={index + 1} value={menu._id}>
                        {menu.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <InputForm
                  htmlfor="image"
                  placehoder="image"
                  type="file"
                  name="image"
                  id="image"
                  onChange={convertToBase64}
                >
                  Image
                </InputForm>
                {images && (
                  <img src={images} alt={images} width={100} height={100} />
                )}
              </div>
              <div className=" flex flex-col">
                <Label htmlfor="descriptions">Descriptions</Label>
                <textarea
                  name="descriptions"
                  id="descriptions"
                  required
                  rows={5}
                  cols={50}
                  placeholder="descriptions"
                  className="p-2"
                />
              </div>
              <InputForm
                htmlfor="price"
                placehoder="price"
                type="number"
                name="price"
                id="price"
              >
                Price
              </InputForm>
              <InputForm
                htmlfor="fat"
                placehoder="fat"
                type="number"
                name="fat"
                id="fat"
              >
                Fat
              </InputForm>
              <InputForm
                htmlfor="sugar"
                placehoder="sugar"
                type="number"
                name="sugar"
                id="sugar"
              >
                Sugar
              </InputForm>
              <InputForm
                htmlfor="calories"
                placehoder="calories"
                type="number"
                name="calories"
                id="calories"
              >
                Calories
              </InputForm>
              <InputForm
                htmlfor="oz"
                placehoder="oz"
                type="number"
                name="oz"
                id="oz"
              >
                Oz
              </InputForm>
            </div>
            <button
              className="flex w-fit gap-1 rounded-md bg-green px-6 py-3 font-semibold text-white"
              type="submit"
            >
              <PlusCircleIcon className="h-6 w-6" />
              Create
            </button>
          </form>
        </ModalInput>
      )}
      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <h1 className="mb-6 font-bold">Edit Product</h1>
          <form onSubmit={handleEditProduct}>
            <div className="flex w-full flex-col gap-x-4 md:grid md:grid-cols-2">
              <InputForm
                htmlfor={"name"}
                placehoder={"name"}
                type={"text"}
                name={"name"}
                id={"name"}
                className="w-full"
                defaultValue={updated.name}
              >
                Name
              </InputForm>
              <div className=" flex flex-col gap-3">
                <label htmlFor="menu" className="font-semibold">
                  Menu
                </label>
                <Select
                  name="menu"
                  id="menu"
                  required
                  defaultValue={updated.id_menu}
                >
                  {menus.map((menu, index) => {
                    return (
                      <option key={index + 1} value={menu._id}>
                        {menu.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <InputForm
                  htmlfor="image"
                  placehoder="image"
                  type="file"
                  name="image"
                  id="image"
                  onChange={convertToBase64}
                  disabled={true}
                >
                  Image
                </InputForm>
                <img
                  src={updated.image}
                  alt={images}
                  width={100}
                  height={100}
                />
              </div>
              <div className=" flex flex-col">
                <Label htmlfor="descriptions">Descriptions</Label>
                <textarea
                  name="descriptions"
                  id="descriptions"
                  required
                  rows={5}
                  cols={50}
                  placeholder="descriptions"
                  defaultValue={updated.descriptions}
                  className="p-2"
                />
              </div>
              <InputForm
                htmlfor="price"
                placehoder="price"
                type="number"
                name="price"
                id="price"
                defaultValue={updated.price}
              >
                Price
              </InputForm>
              <InputForm
                htmlfor="fat"
                placehoder="fat"
                type="number"
                name="fat"
                id="fat"
                defaultValue={updated.fat}
              >
                Fat
              </InputForm>
              <InputForm
                htmlfor="sugar"
                placehoder="sugar"
                type="number"
                name="sugar"
                id="sugar"
                defaultValue={updated.sugar}
              >
                Sugar
              </InputForm>
              <InputForm
                htmlfor="calories"
                placehoder="calories"
                type="number"
                name="calories"
                id="calories"
                defaultValue={updated.calories}
              >
                Calories
              </InputForm>
              <InputForm
                htmlfor="oz"
                placehoder="oz"
                type="number"
                name="oz"
                id="oz"
                defaultValue={updated.oz}
              >
                Oz
              </InputForm>
            </div>
            <button
              className="flex gap-1 rounded-md bg-yellow-400 px-5 py-3 font-bold text-black"
              type="submit"
            >
              <PencilSquareIcon className="h-6 w-6" />
              Edit
            </button>
          </form>
        </ModalInput>
      ) : null}
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <h1 className="mb-6 text-xl font-bold">Delete Product</h1>
          <p className="mb-6 font-semibold">
            Are you sure you want to delete this product?
          </p>
          <button
            className="flex gap-1 rounded-md bg-red-600 px-5 py-3 font-bold text-white"
            type="submit"
            onClick={() => handleDeleteProduct}
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default ProductDashboardPage;
