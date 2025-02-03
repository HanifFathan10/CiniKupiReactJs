import axios from "axios";

export const reproduce = <T>(data: T[], gap: number): { data: T[] } => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };
  return response;
};

export const GetAllMenu = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((res) => {
      callback(false, res.message);
    });
};

export const getImageMenuById = (_id: string, callback: TCallback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const CreateDataMenu = async (data: TDataMenu, callback: TCallback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const EditDataMenu = async (data: TDataMenu, callback: TCallback) => {
  await axios
    .patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${data._id}/update`,
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

export const DeleteDataMenu = async (_id: string, callback: TCallback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`, {
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
