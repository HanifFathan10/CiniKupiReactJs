import axios from "axios";
import { Callback } from "../Interface/axios";

export const reproduce = (data: any, gap: number) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = data.slice(first, last);

  return response;
};

export const getImageMenu = async (callback: Callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};

export const getImageMenuById = (_id: string, callback: Callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};

export const getNestedMenuById = (_id: string, callback: Callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/nested/${_id}`)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};

export const getImageMenuByNameurl = (nameurl: string, callback: Callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${nameurl}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};
