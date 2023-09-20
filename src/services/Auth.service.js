import axios from "axios";

export const Login = (data) => {
  axios
    .post("https://cini-kupi-react-js-api.vercel.app/api/v1/post", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
