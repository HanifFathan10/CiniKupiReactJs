import axios from "axios";

export const Login = (data, callback) => {
  axios
    .post(`${import.meta.env.SERVER_URL}/api/v1/login`, data, { withCredentials: true })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};

export const Register = (data, callback) => {
  axios
    .post(`${import.meta.env.SERVER_URL_VERCEL}/api/v1/register`, data)
    .then((res) => {
      callback(true, res);
      console.log(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};
