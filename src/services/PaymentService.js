import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ClearCart } from "./Order.service";

export const PaymentRequest = async (data, callback) => {
  await axios
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
    });
};

export const GetHistoryTransaction = async (callback, data) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      params: {
        page: data.page,
        limit: data.limit,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getAllHistoryTransaction = async (callback, data = {}) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/histories`, {
      params: {
        page: data.page,
        limit: data.limit,
        search: data.search,
      },
    })
    .then((res) => {
      callback(true, res.data);
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
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const DeleteHistoryTransaction = async (_id, callback) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/history/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const PaymentService = ({
  history,
  token,
  accessToken,
  setIsLoading,
}) => {
  useEffect(() => {
    const handleTransaction = async (res, clearCart = false) => {
      try {
        setIsLoading(true);
        history.status = res.transaction_status;

        await HistoryTransaction(history, (status) => {
          if (status === true) {
            setIsLoading(false);
            if (clearCart === true) {
              ClearCart();
              Navigate("/history-transaction");
              localStorage.removeItem("pendingTransaction");
            }
          }
        });
      } catch (error) {
        setIsLoading(false);
      }
    };

    const makePayment = async () => {
      if (token && window.snap) {
        window.snap.pay(token, {
          onSuccess: (res) => handleTransaction(res, true),
          onPending: (res) => {
            localStorage.setItem(
              "pendingTransaction",
              JSON.stringify({ res, token }),
            );
            handleTransaction(res);
          },
          onError: () => {
            setIsLoading(false);
          },
          onClose: () => {
            setIsLoading(false);
          },
        });
      }
    };

    makePayment();

    // Clean up effect if needed
    return () => {};
  }, [token, history]);

  useEffect(() => {
    if (!accessToken) return Navigate("/login");

    // Load Midtrans script
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    let midtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY; // Assuming you're using environment variables correctly
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [accessToken]);

  return null;
};
