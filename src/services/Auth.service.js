import axios from "axios";

export const Login = (data, callback) => {
  axios
    .post("https://cini-kupi-react-js-api.vercel.app/api/v1/login", data)
    .then((res) => {
      callback(true, res)
      console.log(true, res);
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error);
    });
};

export const Register = (data, callback) => {
  axios
    .post("https://cini-kupi-react-js-api.vercel.app/api/v1/register", data)
    .then((res) => {
      callback(true, res);
      console.log(true, res)
    })
    .catch((error) => {
      callback(false, error);
      console.log(false, error)
    });
};

const AuthService = {
  loginWithOAuth2: () => {
    window.location.href = 'https://cini-kupi-react-js-api.vercel.app/auth/google';
  },

  logout: () => {
    // Implement logout logic here
  },
};

export default AuthService;
