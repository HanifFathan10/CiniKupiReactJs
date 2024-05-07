import React from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import {
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import InputForm from "../../../component/Elements/InputForm";
import {
  CreateDataMenu,
  DeleteDataMenu,
  EditDataMenu,
  getImageMenu,
} from "../../../services/Menu.service";

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
        <div className="w-full bg-[#f1f5f9] p-5 text-black">
          <button
            className="mb-4 h-12 w-32 rounded-md bg-black font-bold text-white"
            onClick={() => setModal(true)}
          >
            Add Menu
          </button>
          <TableContainer className="rounded-xl bg-white drop-shadow-md">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Category</Th>
                  <Th>Name Url</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {menus.map((menu, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{menu.name}</Td>
                      <Td>
                        <img
                          src={menu.image}
                          alt={menu.name}
                          width={100}
                          height={100}
                        />
                      </Td>
                      <Td>{menu.category}</Td>
                      <Td>{menu.nameurl}</Td>
                      <Td className="flex items-center justify-center gap-3">
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setUpdated(menu)}
                        >
                          <PencilSquareIcon className="h-6 w-6 text-black" />
                        </button>
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setDeleted(menu)}
                        >
                          <TrashIcon className="h-6 w-6 text-black" />
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </AdminLayouts>
      {modal === true && (
        <ModalInput onClose={() => setModal(false)}>
          <h1 className="mb-6 text-2xl font-bold">Create Menu</h1>
          <form onSubmit={handleCreateMenu}>
            <div className="grid grid-cols-3">
              <InputForm
                htmlfor={"ame"}
                placehoder={"name"}
                type={"text"}
                name={"name"}
                id={"name"}
              >
                Name
              </InputForm>
              <InputForm
                htmlfor="nameurl"
                placehoder="nameurl"
                type="text"
                name="nameurl"
                id="nameurl"
              >
                Name Url
              </InputForm>
              <div className="mb-4 flex flex-col gap-3">
                <label htmlFor="category">Category</label>
                <Select name="category" id="category" required>
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="drinks">Drinks</option>
                  <option value="foods">Foods</option>
                  <option value="coffe beans">Coffe Beans</option>
                </Select>
              </div>
              <div className="">
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
              className="rounded-md bg-[rgba(0,0,0,0.5)] px-5 py-3 font-bold"
              type="submit"
            >
              Create
            </button>
          </form>
        </ModalInput>
      )}
      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <h1 className="mb-6 font-bold">Edit Product</h1>
          <form onSubmit={handleEditMenu} encType="multipart/form-data">
            <div className="grid grid-cols-3">
              <InputForm
                htmlfor={"name"}
                placehoder={"name"}
                type={"text"}
                name={"name"}
                id={"name"}
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
              <div className="mb-4 flex flex-col gap-3">
                <label htmlFor="category">Category</label>
                <Select name="category" id="category" required>
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="drinks">Drinks</option>
                  <option value="foods">Foods</option>
                  <option value="coffe beans">Coffe Beans</option>
                </Select>
              </div>
              <div className="mb-4">
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
              className="rounded-md bg-[rgba(0,0,0,0.5)] px-5 py-3 font-bold"
              type="submit"
            >
              Edit
            </button>
          </form>
        </ModalInput>
      ) : null}
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <h1 className="mb-6 font-bold">Delete Product</h1>
          <p>Are you sure you want to delete this product?</p>
          <button
            className="rounded-md bg-[rgba(0,0,0,0.5)] px-5 py-3 font-bold"
            type="submit"
            onClick={() => handleDeleteMenu(deleted._id)}
          >
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default MenuDashboardPage;
