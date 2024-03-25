import axios from "axios";

export const getImage = (callback) => {
  axios
    .get("https://cini-kupi-api.vercel.app/api/v1/post")
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageById = (_id, callback) => {
  axios
    .get(`https://cini-kupi-api.vercel.app/api/v1/post/${_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
