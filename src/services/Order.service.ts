import axios from "axios";
import { Callback } from "../Interface/axios";

export const GetOrderByUserId = async (data: any, callback: Callback) => {
  try {
    const response = await axios.get(
      `${process.env.VITE_BACKEND_URL}/api/v1/order`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
      },
    );
    callback(true, response);
  } catch (error: any) {
    callback(false, error);
  }
};

export const AddToCart = async (data: any, callback: Callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const RemoveFromCart = async (_id: any, callback: Callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order/remove`, _id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const ClearCart = async (callback: Callback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/clear-cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
