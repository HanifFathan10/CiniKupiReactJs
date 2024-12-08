import axios from "axios";

// Product Default
export const getAllDefaultProduct = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getDefaultProductById = async (
  _id: string,
  callback: TCallback,
) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

// Product Menu
export const getAllMenuProduct = async (
  callback: TCallback,
  data?: TQueryParamsHistoryTrx,
) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product`, {
      params: {
        page: data?.page,
        limit: data?.limit,
        search: data?.search,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getMenuProductById = async (_id: string, callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const createProductMenu = async (
  data: CreateProductMenu,
  callback: TCallback,
) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product`, data, {
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

export const updateProductMenu = async (
  data: UpdateProductMenu,
  callback: TCallback,
) => {
  await axios
    .patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${data._id}/edit`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      },
    )
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const deleteProductMenu = async (
  data: DeleteProductMenu,
  callback: TCallback,
) => {
  await axios
    .delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/product/${data._id}`,
      {
        data: { id_menu: data.id_menu },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      },
    )
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};