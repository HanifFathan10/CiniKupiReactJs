import axios from "axios";

interface DataMonthlySales {
  year?: number;
}

export const getMonthlySales = async (
  data: DataMonthlySales,
  callback: TCallback,
) => {
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

export const getStatusDistribution = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/status-distribution`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getTopSellingProducts = async (callback: TCallback) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/top-selling-products`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
