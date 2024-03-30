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
