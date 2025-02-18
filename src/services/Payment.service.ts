import axios from "axios";
import { useEffect } from "react";
import { FormCheckoutType } from "../component/Fragment/FormCheckout";

export const GetTokenMidtrans = async (
  data: FormCheckoutType,
  callback: TCallback,
) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/token-midtrans`, data, {
      withCredentials: true,
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

export const GetAllHistoryTransaction = async (
  callback: TCallback,
  data: TQueryParamsHistoryTrx,
) => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/history`, {
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

export const GetHistoryTransactionById = async (
  callback: TCallback,
  data: TQueryParamsHistoryTrx,
) => {
  await axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/history/${data.historyTrxId}`,
      {
        withCredentials: true,
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
      },
    )
    .then((res) => {
      callback(true, res);
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
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/history`, data, {
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

export const DeleteHistoryTransactionByOrderId = async (
  order_id: string,
  callback: TCallback,
) => {
  await axios
    .delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/history/order_id/${order_id}`,
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

interface CreateHistoryTrx extends TDataOrder {
  status: string;
}

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

        const newHistory: CreateHistoryTrx = {
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
    let midtransUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
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
