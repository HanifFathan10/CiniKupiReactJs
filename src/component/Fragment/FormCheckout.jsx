import React, { useState } from "react";
import InputForm from "../Elements/InputForm";
import { Spinner } from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";
import { PaymentRequest, PaymentService } from "../../services/PaymentService";
import { totalItems } from "../../Store/TotalItems";
import { useCustomToast } from "../../Hooks/useToast";

const FormCheckout = () => {
  const [token, setToken] = useState("");
  const [history, setHistory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { WarningToast, ErrorToast } = useCustomToast();
  const product = totalItems(useShallow((state) => state.items));
  const accessToken = sessionStorage.getItem("access_token");

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

// {
//     payment_type: 'bank_transfer',
//     transaction_status: 'settlement',
//     pdf_url:
//       'https://app.sandbox.midtrans.com/snap/v1/transactions/a578ff45-4c18-4f28-be64-6e8336b828f0/pdf',
//     finish_redirect_url:
//       '?order_id=ca7638fe-e6ef-41d3-be20-7a22dec08ac4&status_code=200&transaction_status=settlement',
//     status_code: '200',
//     gross_amount: '21900.00',
//     bca_va_number: '10172053793',
//     transaction_time: '2024-06-27 14:53:25',
//     order_id: 'ca7638fe-e6ef-41d3-be20-7a22dec08ac4',
//     transaction_id: '5e752343-3e8f-4bca-961f-67176a5cead5',
//     fraud_status: 'accept',
//     status_message: 'Success, transaction is found',
//     va_numbers: [ { bank: 'bca', va_number: '10172053793' } ]
//   }
