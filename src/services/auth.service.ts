import axios from "axios";

export const getAllDataUser = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const UpdateDataUser = async (
  data: DataUpdateUser,
  callback: TCallback,
) => {
  await axios
    .patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${data._id}/update`,
      data,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
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

export const DeleteDataUser = async (_id: string, callback: TCallback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${_id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const Login = async (data: IDataUser, callback: TCallback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, data, {
      withCredentials: true,
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const Register = async (data: IDataUser, callback: TCallback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const Logout = async (callback: TCallback) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/logout`,
      {}, // Body request kosong
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    callback(true, response);
  } catch (error) {
    callback(false, error);
  }
};

export const RefreshToken = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/token`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};
