import axios from "axios";

export const GetOrderByUserId = async (
  data: TDataOrder,
  callback: TCallback,
) => {
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

export const AddToCart = async (data: TDataOrder, callback: TCallback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order-one`, data, {
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

export const AddManyItemToCart = async (
  data: TDataOrder,
  callback: TCallback,
) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order-many`, data, {
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
