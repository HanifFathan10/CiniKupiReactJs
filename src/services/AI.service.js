import axios from "axios";

export const getResponse = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/generate`)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const generateResponse = async (data, callback) => {
  await axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/generate-response`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
