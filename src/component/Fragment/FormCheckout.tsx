import * as React from "react";
import { useEffect, useState } from "react";
import InputForm from "../Elements/InputForm";
import { Spinner, useToast } from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";
import {
  HistoryTransaction,
  PaymentRequest,
} from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";
import { totalItems } from "../../Store/TotalItems";
import { ClearCart } from "../../services/Order.service";
import { TDataCustomer } from "../../Types/customer";
import { TDataHistory } from "../../Types/historyOrders";
import { ItotalItems } from "../../Interface/zustand";

const FormCheckout = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [history, setHistory] = useState<TDataHistory>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const product = totalItems(useShallow((state: ItotalItems) => state.items));
  const accessToken = localStorage.getItem("access_token");
  const Navigate = useNavigate();

  const handleCheckout = () => {
    setIsLoading(true);

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const matchResult = email.match(gmailPattern);
    let validEmail = null;
    if (matchResult) {
      validEmail = matchResult[0];
    }

    const data: TDataCustomer = {
      customer_name: name,
      customer_email: validEmail,
      products: product,
    };

    const CustomToast = ({
      title,
      status,
    }: {
      title: string;
      status: "success" | "warning" | "error";
    }) => {
      setIsLoading(false);
      toast({
        title: title,
        containerStyle: {
          marginTop: "80px",
          fontSize: "12px",
        },
        status: status,
        variant: "top-accent",
        position: "top",
        isClosable: true,
      });
    };

    if (data.products.length === 0)
      return CustomToast({
        title: "Please order at least 1 item",
        status: "warning",
      });

    if (!validEmail)
      return CustomToast({
        title: "Please enter a valid email!!",
        status: "warning",
      });

    if (!data.customer_email || !data.customer_name)
      return CustomToast({
        title: "Please enter your name and email!!",
        status: "warning",
      });

    try {
      PaymentRequest(data, (status, res) => {
        if (status) {
          setToken(res.data.token);
          const data = {
            orders: {
              name: res.data.data.customer_details.name,
              email: res.data.data.customer_details.email,
              order_id: res.data.data.transaction_details.order_id,
              gross_amount: res.data.data.transaction_details.gross_amount,
            },
            item_details: res.data.data.item_details,
          };

          setHistory(data);
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error during checkout",
        status: "error",
        containerStyle: {
          marginTop: "80px",
          fontSize: "12px",
        },
        variant: "top-accent",
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    const makePayment = async () => {
      if (token) {
        (window as any).snap.pay(token, {
          onSuccess: async () => {
            try {
              setIsLoading(true);
              await HistoryTransaction(history, (res) => {
                ClearCart((res) => {
                  if (res === true) {
                    setEmail("");
                    setName("");
                    Navigate("/history-transaction");
                  }
                });
              });
            } catch (error) {
              console.log("🚀 ~ onSuccess: ~ error:", error);
            } finally {
              setIsLoading(false);
            }
          },
          onPending: () => {
            // Tetapkan isLoading ke true saat pembayaran tertunda
            setIsLoading(true);
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

    // Bersihkan efek jika diperlukan
    return () => {
      // Lakukan pembersihan jika diperlukan
      setIsLoading(false);
    };
  }, [token, HistoryTransaction, ClearCart]);

  useEffect(() => {
    if (!accessToken) return Navigate("/login");
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    let midtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="bg-primary px-3 py-6 text-light">
      <h1 className="mb-3 font-bold">CUSTOMER DETAILS</h1>
      <form>
        <InputForm
          onChange={(e) => setName(e.target.value)}
          value={name}
          htmlfor="name"
          placeholder="Your Name"
          type="text"
          name="name"
          id="name"
          className="max-w-xs"
        >
          Your Name
        </InputForm>

        <InputForm
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          htmlfor="email"
          placeholder="haniffathan@example.com"
          type="email"
          name="email"
          id="email"
          className="max-w-xs"
        >
          Your Email
        </InputForm>
      </form>

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="flex gap-3 rounded-full bg-secondary px-6 py-4 font-semibold text-primary ring-2 ring-primary transition-all duration-300 hover:bg-light disabled:bg-neutral-500 disabled:text-secondary disabled:ring-0 disabled:hover:bg-neutral-500 disabled:hover:text-white disabled:hover:ring-0"
      >
        Checkout
        {isLoading && <Spinner color="white" />}
      </button>

      <p className="mt-2 cursor-pointer text-xs text-white hover:text-secondary">
        <a
          href="https://simulator.sandbox.midtrans.com/bca/va/index"
          target="_blank"
        >
          *for testing, you can pay via this link
        </a>
      </p>
    </div>
  );
};

export default FormCheckout;
