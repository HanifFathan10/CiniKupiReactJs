import axios from "axios";

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

export const Register = (data, callback) => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const Logout = (callback) => {
  axios
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
