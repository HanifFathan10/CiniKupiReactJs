import React, { useEffect, useState } from "react";
import InputForm from "../Elements/InputForm";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Payment } from "../../Store/Payment";
import { useShallow } from "zustand/react/shallow";
import { addToCart } from "../../Store/AddToCart";
import { PaymentRequest } from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";

const FormCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [pay, setPay] = useState({});
  const resultPayment = Payment(useShallow((state) => state.resultPayment));
  const cartItems = addToCart(useShallow((state) => state.cartItems));
  const accessToken = localStorage.getItem("accessToken");
  const Navigate = useNavigate();

  const handleCheckout = async () => {
    if (!accessToken) return Navigate("/login");
    const data = {
      customer_name: name,
      customer_email: email,
      products: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      await PaymentRequest(data, (status, res) => {
        setToken(res.data.token);
        setPay(res.data.customer_details);
      });
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
          resultPayment(pay);
          localStorage.removeItem("ADD_TO_CART");
        },
        onPending: (result) => {
          window.location.href = "/menu/cart";
        },
        onError: (result) => {
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
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    let midtransClientKey = "SB-Mid-client-dfxRBlhEgj_5S972";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="px-3 py-6 bg-primary text-light">
      <h1 className="font-bold mb-3">CUSTOMER DETAILS</h1>
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
        onClick={() => handleCheckout()}
        className="bg-secondary rounded-full ring-2 ring-primary text-primary px-6 py-4 font-semibold hover:bg-light transition-all duration-300"
      >
        Checkout
      </button>
    </div>
  );
};

export default FormCheckout;
