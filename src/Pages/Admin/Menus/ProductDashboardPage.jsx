import React from "react";
import {
  createProductMenu,
  deleteProductMenu,
  getAllMenuProduct,
  updateProductMenu,
} from "../../../services/product.service";
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
import { rupiah } from "../../../Hooks/useRupiah";
import { truncateText } from "../../../Hooks/useTruncateText";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import InputForm from "../../../component/Elements/InputForm";
import { filterIdMenu } from "../../../Hooks/useFilterIdMenu";
import { getImageMenu } from "../../../services/Menu.service";

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
        console.log(res);
        setModal(false);
      } else {
        console.log(res);
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
      } else {
        console.log(res);
      }
    });
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    const data_id = {
      _id: deleted._id,
      id_menu: deleted.id_menu,
    };

    await deleteProductMenu(data_id, (status, res) => {
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
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
            className="mb-3 w-fit rounded-md bg-dark px-8 py-3 font-bold text-white shadow-md"
            onClick={() => setModal(true)}
          >
            Add New Product
          </button>
          <TableContainer className="rounded-xl bg-white drop-shadow-md">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Menu</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{product.name}</Td>
                      <Td>
                        <img
                          src={product.image}
                          alt="product image"
                          width={100}
                          height={100}
                        />
                      </Td>
                      <Td>{filterIdMenu(product.id_menu)}</Td>
                      <Td>{rupiah(product.price)}</Td>
                      <Td>{truncateText(product.descriptions, 10)}</Td>
                      <Td className="flex justify-center gap-3">
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setUpdated(product)}
                        >
                          <PencilSquareIcon className="h-6 w-6 text-black" />
                        </button>
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setDeleted(product)}
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
          <h1 className="mb-6 font-bold">Create Product</h1>
          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-3">
              <InputForm
                htmlfor={"name"}
                placehoder={"name"}
                type={"text"}
                name={"name"}
                id={"name"}
              >
                Name
              </InputForm>
              <div className="mb-4 flex flex-col gap-3">
                <label htmlFor="menu">Menu</label>
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
              <InputForm
                htmlfor="descriptions"
                placehoder="descriptions"
                type="text"
                name="descriptions"
                id="descriptions"
              >
                Descriptions
              </InputForm>
              <InputForm
                htmlfor="price"
                placehoder="price"
                type="number"
                name="price"
                id="price"
              >
                price
              </InputForm>
              <InputForm
                htmlfor="fat"
                placehoder="fat"
                type="number"
                name="fat"
                id="fat"
              >
                fat
              </InputForm>
              <InputForm
                htmlfor="sugar"
                placehoder="sugar"
                type="number"
                name="sugar"
                id="sugar"
              >
                sugar
              </InputForm>
              <InputForm
                htmlfor="calories"
                placehoder="calories"
                type="number"
                name="calories"
                id="calories"
              >
                calories
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
          <form onSubmit={handleEditProduct}>
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
              <div className="mb-4 flex flex-col gap-3">
                <label htmlFor="menu">Menu</label>
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
              <div className="">
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
              <InputForm
                htmlfor="descriptions"
                placehoder="descriptions"
                type="text"
                name="descriptions"
                id="descriptions"
                defaultValue={updated.descriptions}
              >
                descriptions
              </InputForm>
              <InputForm
                htmlfor="price"
                placehoder="price"
                type="number"
                name="price"
                id="price"
                defaultValue={updated.price}
              >
                price
              </InputForm>
              <InputForm
                htmlfor="fat"
                placehoder="fat"
                type="number"
                name="fat"
                id="fat"
                defaultValue={updated.fat}
              >
                fat
              </InputForm>
              <InputForm
                htmlfor="sugar"
                placehoder="sugar"
                type="number"
                name="sugar"
                id="sugar"
                defaultValue={updated.sugar}
              >
                sugar
              </InputForm>
              <InputForm
                htmlfor="calories"
                placehoder="calories"
                type="number"
                name="calories"
                id="calories"
                defaultValue={updated.calories}
              >
                calories
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
              className="rounded-md bg-[rgba(0,0,0,0.5)] px-5 py-3 font-bold"
              type="submit"
            >
              Update
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
            onClick={handleDeleteProduct}
          >
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default ProductDashboardPage;
