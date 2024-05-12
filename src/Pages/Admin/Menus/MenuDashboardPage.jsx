import React from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import { Select } from "@chakra-ui/react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import InputForm from "../../../component/Elements/InputForm";
import {
  CreateDataMenu,
  DeleteDataMenu,
  EditDataMenu,
  getImageMenu,
} from "../../../services/Menu.service";
import Label from "../../../component/Elements/InputForm/Label";

const MenuDashboardPage = () => {
  const [menus, setMenus] = React.useState([]);
  const [updated, setUpdated] = React.useState({});
  const [deleted, setDeleted] = React.useState({});
  const [images, setImages] = React.useState("");
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await getImageMenu((status, res) => {
        if (status === true) {
          setMenus(res);
        }
      });
    };

    fetchData();
  }, [updated, deleted, modal]);

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
      } else {
        console.log(res);
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
    console.log("🚀 ~ handleEditMenu ~ data:", data);

    await EditDataMenu(data, (status, res) => {
      if (status === true) {
        setUpdated({});
      } else {
        console.log(res);
      }
    });
  };

  const handleDeleteMenu = async (_id) => {
    await DeleteDataMenu({ _id }, (status, res) => {
      if (status === true) {
        setDeleted({});
      } else {
        console.log(res);
      }
    });
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (file.size > maxSize) {
      console.log("File terlalu besar. Harap pilih file yang lebih kecil.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setImages(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
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
            Add New Menu
          </button>
          <table className="min-w-full table-auto rounded-md text-center text-sm font-light">
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
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Name Url
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => {
                return (
                  <tr className="border-b border-neutral-200" key={index}>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {menu.name}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        width={100}
                        height={100}
                        className="bg-cover bg-center object-contain"
                      />
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {menu.category}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {menu.nameurl}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      <button
                        className="mx-1 rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setUpdated(menu)}
                      >
                        <PencilSquareIcon className="h-6 w-6 text-black" />
                      </button>
                      <button
                        className="mx-1 rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setDeleted(menu)}
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
          <h1 className="mb-6 text-xl font-semibold">Create Menu</h1>
          <form onSubmit={handleCreateMenu}>
            <div className="grid gap-x-3 md:grid-cols-2">
              <InputForm
                htmlfor="name"
                placehoder="Name"
                type="text"
                name="name"
                id="name"
              >
                Name
              </InputForm>
              <InputForm
                htmlfor="nameurl"
                placehoder="name-url"
                type="text"
                name="nameurl"
                id="nameurl"
              >
                Name Url
              </InputForm>
              <div className="mb-4 flex flex-col gap-3">
                <label htmlFor="category">Category</label>
                <Select name="category" id="category" required>
                  <option disabled selected>
                    Select Category
                  </option>
                  <option value="drinks">Drinks</option>
                  <option value="foods">Foods</option>
                  <option value="coffe beans">Coffe Beans</option>
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
          <form onSubmit={handleEditMenu} encType="multipart/form-data">
            <div className="grid gap-x-3 md:grid-cols-2">
              <InputForm
                htmlfor="name"
                placehoder="Name"
                type="text"
                name="name"
                id="name"
                defaultValue={updated.name}
              >
                Name
              </InputForm>
              <InputForm
                htmlfor="nameurl"
                placehoder="nameurl"
                type="text"
                name="nameurl"
                id="nameurl"
                defaultValue={updated.nameurl}
              >
                Name Url
              </InputForm>
              <div className="mb-4 flex flex-col">
                <Label htmlFor="category">Category</Label>
                <Select name="category" id="category" required>
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="drinks">Drinks</option>
                  <option value="foods">Foods</option>
                  <option value="coffe beans">Coffe Beans</option>
                </Select>
              </div>
              <div>
                <InputForm
                  htmlfor="image"
                  placehoder="image"
                  type="file"
                  name="image"
                  id="image"
                  disabled={true}
                  onChange={convertToBase64}
                >
                  Image
                </InputForm>
                <img
                  src={updated.image}
                  alt={updated.image}
                  width={100}
                  height={100}
                />
              </div>
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
            onClick={() => handleDeleteMenu(deleted._id)}
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default MenuDashboardPage;
