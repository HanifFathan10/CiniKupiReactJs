import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";
import { PaymentRequest, PaymentService } from "../../services/PaymentService";
import { totalItems } from "../../Store/TotalItems";
import { useCustomToast } from "../../Hooks/useToast";
import {
  HomeModernIcon,
  InboxIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { ClearCart } from "../../services/Order.service";

const FormCheckout = () => {
  const [token, setToken] = useState("");
  const [history, setHistory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();

  const { WarningToast, ErrorToast } = useCustomToast();
  const product = totalItems(useShallow((state) => state.items));
  const accessToken = sessionStorage.getItem("access_token");
  const dataPending = localStorage.getItem("pendingTransaction");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("status_code")) {
      ClearCart((status, res) => {
        if (status) return Navigate("/history-transaction");
      });
    }
  }, [location]);

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
        customer_phone: e.target.phone.value,
        customer_address: e.target.address.value,
        products: product,
      };

      if (data.products.length === 0)
        return WarningToast({
          title: "Please order at least 1 item",
          status: "warning",
        });

      if (!validEmail)
        return WarningToast({
          title: "Please enter a valid email!!",
          status: "warning",
        });

      if (dataPending) {
        return ErrorToast({
          title:
            "You have a pending transaction, please check in history transaction",
          status: "error",
        });
      }

      await PaymentRequest(data, (status, res) => {
        if (status) {
          setToken(res.data.token);
          let data = {
            order: {
              name: res.data.data.customer_details.name,
              email: res.data.data.customer_details.email,
              phone: res.data.data.customer_details.phone,
              order_id: res.data.data.transaction_details.order_id,
              address: res.data.data.customer_details.shipping_address.address,
              gross_amount: res.data.data.transaction_details.gross_amount,
            },
            item_details: res.data.data.item_details,
            status: "",
          };

          setHistory(data);
        }
      });
    } catch (error) {
      setIsLoading(false);
      ErrorToast({
        title: "Error during checkout",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  PaymentService({ token, history, accessToken, setIsLoading });

  return (
    <div className="bg-chocolate px-3 py-6 text-white">
      <h1 className="mb-3 font-bold">CUSTOMER DETAILS</h1>
      <form onSubmit={handleCheckout}>
        <label for="name" class="mb-2 block text-sm font-medium text-white">
          Your Name
        </label>
        <div class="relative mb-6 md:w-1/2">
          <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <UserIcon class="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            class="block w-full rounded-lg border border-gray-300 border-gray-300 bg-transparent p-2.5 ps-10 text-sm text-gray-900  text-white placeholder-gray-400 focus:border-blue-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-blue-500"
            placeholder="your name"
            required
          />
        </div>

        <label for="email" class="mb-2 block text-sm font-medium text-white">
          Your Email
        </label>
        <div class="relative mb-6 md:w-1/2">
          <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <InboxIcon class="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            class="block w-full rounded-lg border border-gray-300 border-gray-300 bg-transparent p-2.5 ps-10 text-sm text-gray-900  text-white placeholder-gray-400 focus:border-blue-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-blue-500"
            placeholder="youremail@gmail.com"
            required
          />
        </div>

        <label for="phone" class="mb-2 block text-sm font-medium text-white">
          Phone number or Whatsapp:
        </label>
        <div class="relative mb-4 md:w-1/2">
          <div class="pointer-events-none absolute inset-y-0 start-0 top-0 flex items-center ps-3.5">
            <PhoneIcon class="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="number"
            id="phone"
            name="phone"
            aria-describedby="helper-text-explanation"
            class="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 ps-10 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="+62 812 3456 7890"
            required
          />
        </div>

        <label for="address" class="mb-2 block text-sm font-medium text-white">
          Shipping address
        </label>
        <div class="relative mb-6 md:w-1/2">
          <div class="pointer-events-none absolute inset-y-0 start-0 flex items-start py-3 ps-3.5">
            <HomeModernIcon class="h-4 w-4 text-gray-500" />
          </div>
          <textarea
            rows="4"
            cols="50"
            type="text"
            id="address"
            name="address"
            class="block w-full rounded-lg border border-gray-300 border-gray-300 bg-transparent p-2.5 ps-10 text-sm text-gray-900  text-white placeholder-gray-400 focus:border-blue-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-blue-500"
            placeholder="jl. jalan jalan no. 1 rt. 00 rw. 00 kota wakanda"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className=" flex gap-3 rounded-full bg-secondary px-6 py-4 font-semibold text-chocolate transition-all duration-300 disabled:bg-neutral-500 disabled:text-secondary disabled:hover:bg-neutral-500 disabled:hover:text-white disabled:hover:ring-0"
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
