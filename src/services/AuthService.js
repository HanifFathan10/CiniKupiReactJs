import axios from "axios";

export const Login = async (data, callback) => {
  await axios
    .post("https://cini-kupi-api.vercel.app/api/v1/login", data, {
      withCredentials: true,
    })
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
    .post("https://cini-kupi-api.vercel.app/api/v1/register", data)
    .then((res) => {
      callback(true, res);
      console.log(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};

export const Logout = (callback) => {
  axios
    .post("https://cini-kupi-api.vercel.app/api/v1/logout", "", {
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res);
      console.log(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};
