import axios from "axios";
import { useEffect } from "react";

export const PaymentRequest = async (
  data: TGetTokenForPayment,
  callback: TCallback,
) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/token`, data, {
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

export const GetHistoryTransaction = async (
  callback: TCallback,
  data: TQueryParamsHistoryTrx,
) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      params: {
        page: data.page,
        limit: data.limit,
        status: data.status,
        time: data.time,
      },
    })
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getAllHistoryTransaction = async (
  callback: TCallback,
  data: TQueryParamsHistoryTrx,
) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/histories`, {
      params: {
        page: data.page,
        search: data.search,
        sortKey: data.sortKey,
        sortDirection: data.sortDirection,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const HistoryTransaction = async (
  data: TDataOrder,
  callback: TCallback,
) => {
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

export const DeleteHistoryTransaction = async (
  _id: string,
  callback: TCallback,
) => {
  await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/history/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const DeleteHistoryTransactionByOrderId = async (
  order_id: string,
  callback: TCallback,
) => {
  await axios
    .delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/history/order_id/${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      },
    )
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
}: PaymentServiceProps) => {
  useEffect(() => {
    const handleTransaction = async (res: ResponsePayment) => {
      try {
        setIsLoading(true);

        const newHistory = {
          ...history,
          status: res.transaction_status,
        };

        await HistoryTransaction(newHistory, (status, res) => {
          if (status === true) {
            setIsLoading(false);
          }
        });
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    const makePayment = async () => {
      if (token) {
        (window as any).snap.pay(token, {
          onSuccess: async (res: ResponsePayment) => {
            handleTransaction(res);
          },
          onPending: (res: ResponsePayment) => {
            const pendingTransaction = JSON.parse(
              localStorage.getItem("pendingTransaction")!,
            );

            if (!pendingTransaction) {
              handleTransaction(res);
              localStorage.setItem(
                "pendingTransaction",
                JSON.stringify({ history, token }),
              );
              setIsLoading(false);
            }

            return;
          },
          onError: () => {
            // Tetapkan isLoading ke false saat terjadi kesalahan
            setIsLoading(false);
          },
          onClose: () => {
            // Tetapkan isLoading ke false saat pembayaran ditutup
            setIsLoading(false);
          },
        });
      }
    };

    makePayment();

    return () => {};
  }, [token, history]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let scriptTag = document.createElement("script");
    let midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    scriptTag.setAttribute("src", midtransUrl);

    let midtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      // Add any necessary cleanup logic here
      document.body.removeChild(scriptTag);
    };
  }, [accessToken]);

  return null;
};
