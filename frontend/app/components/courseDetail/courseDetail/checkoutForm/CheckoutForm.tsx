import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "../../../../redux/api/orders/ordersApi";
import { styles } from "../../../../styles/style";
import toast from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
};
const CheckoutForm = ({ setOpen, data }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<any>("");

  const stripe = useStripe();
  const elements = useElements();

  const [createOrder, { isSuccess, error }] = useCreateOrderMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      createOrder({ courseId: data?._id, paymentInfo: paymentIntent });
      setIsLoading(false);
    }

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order placed successfully");
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" className="mt-5 dark:text-white" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`${styles.button} mt-5 !h-[35px] !w-[120px] bg-[#37a39a] text-white`}
      >
        <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
      </button>
      {message && (
        <div id="payment-message" className="text-red-500 font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
