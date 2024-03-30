import axios from "axios";

export const getImage = (callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageById = (_id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
