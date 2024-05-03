import axios, { AxiosResponse } from "axios";

type Callback = (status: boolean, data: AxiosResponse | Error | any) => void;

export const Login = async (
  data: { email: string; password: string },
  callback: Callback,
) => {
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

export const Register = (
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  callback: Callback,
) => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const Logout = (callback: Callback) => {
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
