import axios from "axios";

export const GetOrderByUserId = async (data, callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const AddToCart = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const ClearCart = (callback) => {
  axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/clear-cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
