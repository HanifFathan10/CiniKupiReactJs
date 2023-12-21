import axios from "axios";

export const PaymentRequest = (data, callback) => {
  axios
    .post("https://cini-kupi-react-js-api.vercel.app/api/token", data, {
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
