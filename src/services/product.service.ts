import axios, { AxiosResponse } from "axios";
import { Callback } from "../Interface/axios";

export const getImage = (callback: Callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};

export const getImageById = (_id: string, callback: Callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(false, error);
    });
};
