import React, { useEffect, useState } from "react";
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

const FormCheckout = () => {
  const [token, setToken] = useState("");
  const [history, setHistory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [clearCart, setClearCart] = useState(false);
  const toast = useToast();
  const product = totalItems(useShallow((state) => state.items));
  const accessToken = sessionStorage.getItem("access_token");
  const Navigate = useNavigate();

  useEffect(() => {
    if (clearCart) {
      ClearCart((status, res) => {
        if (status === true) {
          setEmail("");
          setName("");
          setIsLoading(false);
          setTimeout(() => {
            Navigate("/history-transaction");
          }, 1500);
        }
      });
    }
  }, [clearCart]);

  const handleCheckout = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      const matchResult = e.target.email.value.match(gmailPattern);
      let validEmail = null;
      if (matchResult) {
        validEmail = matchResult[0];
      }

      const data = {
        customer_name: e.target.name.value,
        customer_email: validEmail,
        products: product,
      };

      const CustomToast = ({ title, status }) => {
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

      await PaymentRequest(data, (status, res) => {
        if (status) {
          setToken(res.data.token);
          const data = {
            order: {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const makePayment = async () => {
      if (token) {
        window.snap.pay(token, {
          onSuccess: async () => {
            try {
              setIsLoading(true);
              await HistoryTransaction(history, async (status, res) => {
                if (status === true) {
                  setClearCart(true);
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
          },
          onPending: () => {
            setIsLoading(true);
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

    // Bersihkan efek jika diperlukan
    return () => {
      // Lakukan pembersihan jika diperlukan
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
    <div className="bg-chocolate px-3 py-6 text-white">
      <h1 className="mb-3 font-bold">CUSTOMER DETAILS</h1>
      <form onSubmit={handleCheckout}>
        <InputForm
          htmlfor="name"
          placehoder="Your Name"
          type="text"
          name="name"
          id="name"
          className="md:w-1/2"
        >
          Your Name
        </InputForm>

        <InputForm
          htmlfor="email"
          placehoder="haniffathan@example.com"
          type="email"
          name="email"
          id="email"
          className="md:w-1/2"
        >
          Your Email
        </InputForm>

        <button
          type="submit"
          disabled={isLoading}
          className=" flex gap-3 rounded-full bg-secondary px-6 py-4 font-semibold text-chocolate ring-2 transition-all duration-300 disabled:bg-neutral-500 disabled:text-secondary disabled:ring-0 disabled:hover:bg-neutral-500 disabled:hover:text-white disabled:hover:ring-0"
        >
          Checkout
          {isLoading && <Spinner color="white" />}
        </button>
      </form>

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
