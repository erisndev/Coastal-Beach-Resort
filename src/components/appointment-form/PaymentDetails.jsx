import React, { useState } from "react";
import { Check, ArrowLeft } from "lucide-react";
import PaystackPop from "@paystack/inline-js";

export const PaymentDetails = ({
  bookingData,
  onNext,
  onPaymentSuccess,
  calculateTotal,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = () => {
    setError(null);
    setLoading(true);

    try {
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: bookingData.guestDetails.email,
        amount: Math.round(calculateTotal() * 100), // in cents
        currency: "ZAR",
        ref: bookingData.paymentReference, // backend-generated reference
        metadata: {
          custom_fields: [
            {
              display_name: "Guest Name",
              variable_name: "guest_name",
              value: `${bookingData.guestDetails.firstName} ${bookingData.guestDetails.lastName}`,
            },
            {
              display_name: "Room",
              variable_name: "room_name",
              value: bookingData.selectedRoom?.name,
            },
          ],
        },
        onSuccess: async (transaction) => {
          setLoading(false);
          try {
            // Explicitly set referrerPolicy to reduce warnings
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/bookings/verify-payment/${
                transaction.reference
              }`,
              { referrerPolicy: "strict-origin-when-cross-origin" }
            );

            if (!response.ok) throw new Error("Payment verification failed");

            const resData = await response.json();
            const updatedBooking = resData.booking;

            onPaymentSuccess(updatedBooking); // pass updated booking to parent
            onNext();
          } catch (err) {
            setError(err.message || "Payment verification failed");
          }
        },
        onCancel: () => {
          setLoading(false);
          setError("Payment was cancelled.");
        },
      });
    } catch (err) {
      setLoading(false);
      setError("An error occurred while initiating payment.");
      console.error("Paystack init error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment</h2>
        <p className="text-gray-600">
          Complete your payment securely with Paystack
        </p>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
          <span>Total to Pay:</span>
          <span>R {calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
          <Check className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
