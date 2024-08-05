import axios from "axios";

export const getMonthlySales = async (data, callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/monthly-sales`, {
      params: {
        year: data.year,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getStatusDistribution = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/status-distribution`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getTopSellingProducts = async (callback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/top-selling-products`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
