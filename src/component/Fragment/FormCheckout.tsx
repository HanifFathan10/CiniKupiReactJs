import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";
import {
  GetTokenMidtrans,
  PaymentService,
} from "../../services/Payment.service";
import { totalItems } from "../../Store/TotalItems";
import { useCustomToast } from "../../Hooks/useToast";
import {
  HomeModernIcon,
  InboxIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClearCart } from "../../services/order.service";
import { AxiosError } from "axios";
import { z } from "zod";

const FormCheckoutZodSchema = z.object({
  products: z.array(
    z.object({
      _id: z.string(),
      quantity: z.number(),
    }),
  ),
  customer_name: z.string().min(3).max(20),
  customer_email: z.string().email(),
  customer_phone: z.string(),
  customer_address: z.string().min(3),
});

export type FormCheckoutType = z.infer<typeof FormCheckoutZodSchema>;

const FormCheckout = () => {
  const dataForGetToken = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({
    name: null,
    email: null,
    phone: null,
    address: null,
  });
  const [token, setToken] = useState<string>("");
  const [history, setHistory] = useState<THistoryResponseOrder>(
    {} as THistoryResponseOrder,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Navigate = useNavigate();
  const location = useLocation();

  const productFromCart = totalItems(useShallow((state) => state.items));
  const { WarningToast, ErrorToast } = useCustomToast();
  const accessToken = sessionStorage.getItem("access_token")!;
  const dataPending = localStorage.getItem("pendingTransaction");

  useEffect(() => {
    const searchParams = location?.search.match(/status_code=(\d+)/);

    if (searchParams) {
      ClearCart((status, res) => {
        if (status) return Navigate("/history-transaction");
      });
    }
  }, [location]);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const isValidEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(
        dataForGetToken.current.email?.value!,
      );

      let errorMessage = "";

      if (!productFromCart.length) {
        errorMessage = "Please order at least 1 item";
      } else if (!isValidEmail) {
        errorMessage = "Please enter a valid email!!";
      } else if (dataPending) {
        errorMessage =
          "You have a pending transaction, please check in history transaction";
      }

      if (errorMessage) {
        return WarningToast({
          title: errorMessage,
        });
      }

      const data: FormCheckoutType = {
        customer_name: dataForGetToken.current.name?.value!,
        customer_email: dataForGetToken.current.email?.value!,
        customer_phone: dataForGetToken.current.phone?.value!,
        customer_address: dataForGetToken.current.address?.value!,
        products: productFromCart.map((product) => ({
          _id: product.product_id,
          quantity: product.quantity,
        })),
      };

      await GetTokenMidtrans(data, (status, res) => {
        if (status) {
          setToken(res.token);
          setHistory(res.data);
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        ErrorToast({
          id: "checkout-error",
          title: error.message,
        });
      } else if (error instanceof AxiosError) {
        ErrorToast({
          id: "checkout-error",
          title: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  PaymentService({ token, history, accessToken, setIsLoading });

  return (
    <div className=" w-full bg-primary px-3 py-6 text-white">
      <h1 className="mb-3 text-xl font-bold tracking-wide">CUSTOMER DETAILS</h1>
      <form onSubmit={handleCheckout}>
        <label htmlFor="name" className="mb-2 block text-sm font-medium ">
          Your Name
        </label>
        <div className="relative mb-6 lg:max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <UserIcon className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            id="name"
            ref={(el) => (dataForGetToken.current.name = el!)}
            className="block w-full rounded-lg border border-gray-300  bg-transparent p-2.5 ps-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your name"
            required
          />
        </div>

        <label htmlFor="email" className="mb-2 block text-sm font-medium ">
          Your Email
        </label>
        <div className="relative mb-6 lg:max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <InboxIcon className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="email"
            id="email"
            ref={(el) => (dataForGetToken.current.email = el!)}
            className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 ps-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="youremail@gmail.com"
            required
          />
        </div>

        <label htmlFor="phone" className="mb-2 block text-sm font-medium ">
          Phone number or Whatsapp:
        </label>
        <div className="relative mb-4 lg:max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 start-0 top-0 flex items-center ps-3.5">
            <PhoneIcon className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="number"
            inputMode="numeric"
            id="phone"
            ref={(el) => (dataForGetToken.current.phone = el!)}
            aria-describedby="helper-text-explanation"
            className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 ps-10 text-sm  focus:border-blue-500 focus:ring-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="+62 812 3456 7890"
            required
          />
        </div>

        <label htmlFor="address" className="mb-2 block text-sm font-medium ">
          Shipping address
        </label>
        <div className="relative mb-6 lg:max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-start py-3 ps-3.5">
            <HomeModernIcon className="h-4 w-4 text-gray-500" />
          </div>
          <textarea
            rows={4}
            cols={50}
            typeof="text"
            id="address"
            ref={(el) => (dataForGetToken.current.address = el!)}
            className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 ps-10 text-sm  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="jl. jalan jalan no. 1 rt. 00 rw. 00 kota wakanda"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex gap-3 rounded-full bg-teriary px-6 py-4 font-semibold text-primary transition-all duration-300 disabled:bg-neutral-500 disabled:text-secondary disabled:hover:bg-neutral-500 disabled:hover:ring-0"
        >
          Checkout
          {isLoading && <Spinner color="white" />}
        </button>
      </form>

      <Link
        to="https://simulator.sandbox.midtrans.com/bca/va/index"
        target="_blank"
        className="mt-3 flex cursor-pointer justify-end text-end text-xs text-neutral-400 underline hover:text-secondary hover:no-underline"
      >
        *for testing, you can pay via this link
      </Link>
    </div>
  );
};

export default FormCheckout;
