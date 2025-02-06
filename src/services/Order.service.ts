import axios from "axios";

type TAddToCart = { _id: string; name: string; quantity: number };

export const GetAllOrders = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, {
      withCredentials: true,
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

export const AddToCart = async (data: TAddToCart, callback: TCallback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const ClearCart = async (callback: TCallback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/clear-cart`, {
      withCredentials: true,
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
