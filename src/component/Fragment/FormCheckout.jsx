import React, { useEffect, useState } from "react";
import InputForm from "../Elements/InputForm";
import { Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { Payment } from "../../Store/Payment";
import { useShallow } from "zustand/react/shallow";
import { addToCart } from "../../Store/AddToCart";
import {
  HistoryTransaction,
  PaymentRequest,
} from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";
import { totalItems } from "../../Store/TotalItems";

const FormCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [pay, setPay] = useState({});
  const [history, setHistory] = useState({});
  const toast = useToast();
  const resultPayment = Payment(useShallow((state) => state.resultPayment));
  const product = totalItems(useShallow((state) => state.items));
  const accessToken = localStorage.getItem("access_token");
  const Navigate = useNavigate();

  const handleCheckout = () => {
    const data = {
      customer_name: name,
      customer_email: email,
      products: product,
    };

    try {
      if (data.customer_name === "" || data.customer_email === "") {
        toast({
          title: "Please input your name and email",
          status: "warning",
          containerStyle: {
            marginTop: "80px",
            fontSize: "12px",
          },
          variant: "top-accent",
          isClosable: true,
          position: "top",
        });
      } else {
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
          }
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          window.location.href = "/order-status/";
          setEmail("");
          setName("");
          setToken("");
        },
        onPending: (result) => {
          console.log(result);
          window.location.href = "/menu/cart";
        },
        onError: (error) => {
          console.log(error);
          window.location.href = "/menu/cart";
        },
        onClose: () => {
          <Alert status="warning" variant="solid">
            <AlertIcon />
            Anda belum menyelesaikan pembayaran!!
          </Alert>;
        },
      });
    }
  }, [token]);

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
      <form action="">
        <InputForm
          onChange={(e) => setName(e.target.value)}
          value={name}
          htmlfor="name"
          placehoder="Your Name"
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
          placehoder="haniffathan@example.com"
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
        className="rounded-full bg-secondary px-6 py-4 font-semibold text-primary ring-2 ring-primary transition-all duration-300 hover:bg-light"
      >
        Checkout
      </button>
    </div>
  );
};

export default FormCheckout;
