import React from "react";
import {
  getAllMenuProduct,
  updateProductMenu,
} from "../../../services/product.service";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import {
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
import { getImageMenu } from "../../../services/Menu.service";
import { filterIdMenu } from "../../../Hooks/useFilterIdMenu";

const ProductDashboardPage = () => {
  const [products, setProducts] = React.useState([]);
  const [updated, setUpdated] = React.useState({});

  React.useEffect(() => {
    getAllMenuProduct((status, res) => {
      if (status === true) {
        setProducts(res);
      }
    });
  }, []);

  const handleEditUser = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      image: e.target.image.value,
      descriptions: e.target.descriptions.value,
      price: e.target.price.value,
      fat: e.target.fat.value,
      sugar: e.target.sugar.value,
      calories: e.target.calories.value,
    };

    await updateProductMenu(data, (status, res) => {
      if (status === true) {
        console.log(res);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Product Dashboard" description="Product dashboard" />
      <AdminLayouts>
        <div className="w-full bg-[#f1f5f9] p-5 text-black">
          <button className="mb-3 w-fit rounded-md bg-dark px-8 py-3 font-bold text-white shadow-md">
            Add New Product
          </button>
          <TableContainer className="rounded-xl bg-white drop-shadow-md">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Name</Th>
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
                        <button className="rounded-md bg-[rgba(0,0,0,0.5)] p-2">
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
      {Object.keys(updated).length && (
        <ModalInput onClose={() => setUpdated({})}>
          <h1 className="mb-6 font-bold">Edit Product</h1>
          <form onSubmit={handleEditUser}>
            <div className="grid grid-cols-3">
              <InputForm
                htmlfor={"Name"}
                placehoder={"Name"}
                type={"text"}
                name={"Name"}
                id={"Name"}
                defaultValue={updated.name}
              >
                Name
              </InputForm>
              <InputForm
                htmlfor={"Menu"}
                placehoder={"Menu"}
                type={"text"}
                name={"Menu"}
                id={"Menu"}
                defaultValue={filterIdMenu(updated.id_menu)}
                disabled={true}
              >
                Menu
              </InputForm>
              <InputForm
                htmlfor="image"
                placehoder="image"
                type="text"
                name="image"
                id="image"
                defaultValue={updated.image}
              >
                Image
              </InputForm>
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
            </div>
            <button
              className="rounded-md bg-[rgba(0,0,0,0.5)] px-5 py-3 font-bold"
              type="submit"
            >
              Update
            </button>
          </form>
        </ModalInput>
      )}
    </React.Fragment>
  );
};

export default ProductDashboardPage;
