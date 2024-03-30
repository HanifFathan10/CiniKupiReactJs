import axios from "axios";

export const reproduce = (data, gap) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };
  return response;
};

export const getImageMenu = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageMenuById = (_id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNestedMenuById = (_id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/nested/${_id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageMenuByNameurl = (nameurl, callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${nameurl}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
