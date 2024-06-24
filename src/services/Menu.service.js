import axios from "axios";

export const reproduce = (data, gap) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };
  return response;
};

export const GetAllMenu = async (callback, data = {}) => {
  const params = {
    category: data.category,
  };

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`,
      {
        params: Object.keys(params).length ? params : undefined,
      },
    );
    callback(true, res.data);
  } catch (error) {
    callback(false, error);
  }
};

export const getImageMenuById = (_id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const CreateDataMenu = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const EditDataMenu = async (data, callback) => {
  await axios
    .patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const DeleteDataMenu = async (_id, callback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/${_id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};
