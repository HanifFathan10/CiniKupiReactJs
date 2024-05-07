import React, { useEffect } from "react";
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
import {
  DeleteDataUser,
  UpdateDataUser,
  getAllDataUser,
} from "../../../services/AuthService";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import InputForm from "../../../component/Elements/InputForm";
import ModalInput from "../../../component/Elements/InputForm/Modal";

const UserDashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [updated, setUpdated] = React.useState({});
  const [deleted, setDeleted] = React.useState({});

  useEffect(() => {
    getAllDataUser((status, res) => {
      if (status === true) {
        setUsers(res.data);
      }
    });
  }, [updated, deleted]);

  const handleEditUser = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };

    await UpdateDataUser(data, (status, res) => {
      if (status === true) {
        setUpdated({});
      } else {
        console.log(res);
      }
    });
  };

  const handleDeleteUser = async (_id) => {
    await DeleteDataUser(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
        console.log(res);
      } else {
        console.log(res);
      }
    });
  };
  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" description="users dashboard" />
      <AdminLayouts>
        <div className="h-full w-full bg-[#f1f5f9] p-5 text-black">
          <TableContainer className="rounded-xl bg-white drop-shadow-md">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <th>Action</th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{user.username}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.role}</Td>
                      <Td className="flex justify-center gap-3">
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setUpdated(user)}
                        >
                          <PencilSquareIcon className="h-6 w-6 text-black" />
                        </button>
                        <button
                          className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                          onClick={() => setDeleted(user)}
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
      {Object.keys(updated).length ? (
        <ModalInput onClose={() => setUpdated({})}>
          <h1 className="mb-6 font-bold">Edit Product</h1>
          <form onSubmit={handleEditUser}>
            <div className="grid grid-cols-2">
              <InputForm
                htmlfor="username"
                placehoder="username"
                type="text"
                name="username"
                id="username"
                defaultValue={updated.username}
                disabled={true}
              >
                Username
              </InputForm>
              <InputForm
                htmlfor="email"
                placehoder="email"
                type="text"
                name="email"
                id="email"
                defaultValue={updated.email}
                disabled={true}
              >
                Email
              </InputForm>
              <div className="mb-4">
                <label htmlFor="role">Role</label>
                <Select defaultValue={updated.role} id="role" name="role">
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Select>
              </div>
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
            onClick={() => handleDeleteUser(deleted._id)}
          >
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default UserDashboardPage;
