import axios from "axios";

export const getImageMenu = (callback) => {
  axios
    .get("https://cini-kupi-react-js-api.vercel.app/api/v1/menu")
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageMenuById = (_id, callback) => {
  axios
    .get(`https://cini-kupi-react-js-api.vercel.app/api/v1/menu/${_id}`)
    .then((res) => {
      callback(res.data);
      // console.log(res)
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNestedMenu = (callback) => {
  axios
    .get("https://cini-kupi-react-js-api.vercel.app/api/v1/nested")
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNestedMenuById = (_id, callback) => {
  axios
    .get(`https://cini-kupi-react-js-api.vercel.app/api/v1/nested/${_id}`)
    .then((res) => {
      callback(res.data.data);
      console.log(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImageMenuByNameurl = (nameurl, callback) => {
  axios
    .get(`https://cini-kupi-react-js-api.vercel.app/api/v1/menu/product/${nameurl}`)
    .then((res) => {
      const data = res.data
      callback(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};