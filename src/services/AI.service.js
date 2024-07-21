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

export const generateResponse = async (prompt, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/generate-response`, {
      prompt,
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
