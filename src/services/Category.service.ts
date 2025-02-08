import axios from "axios";

export const GetAllCategory = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/category`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((res) => {
      callback(false, res.message);
    });
};
