import axios from "axios";

export const PaymentRequest = (data, callback) => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/token`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};

export const GetHistoryTransaction = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const HistoryTransaction = async (data, callback) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/history`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};
