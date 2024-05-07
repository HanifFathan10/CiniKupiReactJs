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
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/edit`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const deleteProductMenu = async (data_id, callback) => {
  await axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/delete`,
      data_id,
    )
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};
