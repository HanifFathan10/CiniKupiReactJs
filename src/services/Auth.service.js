import axios from "axios";

export const Login = (data, callback) => {
  axios
    .post("https://cini-kupi-react-js-api.vercel.app/api/v1/login", data)
    .then((res) => {
      callback(true, res.data.accesToken)
    })
    .catch((error) => {
      callback(false, error)
    });
};

export const Register = (data, callback) => {
  axios.post('https://cini-kupi-react-js-api.vercel.app/api/v1/users', data)
  .then((res) => {
    callback(true, res);
  })
  .catch((error) => {
    callback(false, error);
  });
}
