import axios from "axios";

// Product Default
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

// Product Menu
export const getAllMenuProduct = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const getMenuProductById = async (id, callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const createProductMenu = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product`, data, {
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const updateProductMenu = async (data, callback) => {
  await axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const deleteProductMenu = async (_id, callback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};
