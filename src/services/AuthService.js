import axios from "axios";

export const getAllDataUser = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const UpdateDataUser = async (data, callback) => {
  await axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const DeleteDataUser = async (_id, callback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const Login = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, data, {
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const Register = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const Logout = async (callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/logout`, "", {
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
