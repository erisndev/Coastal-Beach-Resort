import React from "react";
import { CreditCard, Check, ArrowLeft } from "lucide-react";

// Step 5 Component: Payment Details
export const PaymentDetails = ({
  bookingData,
  setBookingData,
  onNext,
  onPrev,
  calculateTotal,
}) => {
  const handlePaymentChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, [field]: value },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Details
        </h2>
        <p className="text-gray-600">Secure payment processing</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CreditCard className="inline w-4 h-4 mr-1" />
            Card Number
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            value={bookingData.paymentDetails.cardNumber}
            onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.paymentDetails.expiryDate}
              onChange={(e) =>
                handlePaymentChange("expiryDate", e.target.value)
              }
              placeholder="MM/YY"
              maxLength="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.paymentDetails.cvv}
              onChange={(e) => handlePaymentChange("cvv", e.target.value)}
              placeholder="123"
              maxLength="4"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            value={bookingData.paymentDetails.cardName}
            onChange={(e) => handlePaymentChange("cardName", e.target.value)}
            placeholder="Name on card"
          />
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total to Pay:</span>
            <span>R{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={
            !bookingData.paymentDetails.cardNumber ||
            !bookingData.paymentDetails.expiryDate ||
            !bookingData.paymentDetails.cvv ||
            !bookingData.paymentDetails.cardName
          }
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Complete Booking
          <Check className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// {import React, { useState } from "react";
// import { Check, ArrowLeft } from "lucide-react";
// import PaystackPop from "@paystack/inline-js";

// export const PaymentDetails = ({
//   bookingData,
//   onPrev,
//   onPaymentSuccess,
//   calculateTotal,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handlePayment = () => {
//     setError(null);
//     setLoading(true);

//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: "YOUR_PAYSTACK_PUBLIC_KEY", // Replace with your Paystack public key
//       email: bookingData.guestDetails.email,
//       amount: Math.round(calculateTotal() * 100), // amount in cents/kobo
//       currency: "ZAR",
//       ref: `booking_${Date.now()}`, // Unique reference
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Guest Name",
//             variable_name: "guest_name",
//             value: `${bookingData.guestDetails.firstName} ${bookingData.guestDetails.lastName}`,
//           },
//           {
//             display_name: "Room",
//             variable_name: "room_name",
//             value: bookingData.selectedRoom?.name,
//           },
//         ],
//       },
//       onSuccess: (transaction) => {
//         setLoading(false);
//         // Call the parent callback to notify payment success with transaction ref
//         onPaymentSuccess(transaction);
//       },
//       onCancel: () => {
//         setLoading(false);
//         setError("Payment was cancelled.");
//       },
//     });
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment</h2>
//         <p className="text-gray-600">
//           Complete your payment securely with Paystack
//         </p>
//       </div>

//       <div className="bg-amber-50 p-4 rounded-lg mb-6">
//         <div className="flex justify-between items-center text-lg font-bold text-gray-800">
//           <span>Total to Pay:</span>
//           <span>R {calculateTotal().toFixed(2)}</span>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
//       )}

//       <div className="flex justify-between mt-8">
//         <button
//           onClick={onPrev}
//           disabled={loading}
//           className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center"
//         >
//           <ArrowLeft className="mr-2 w-4 h-4" />
//           Back
//         </button>

//         <button
//           onClick={handlePayment}
//           disabled={loading}
//           className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//           <Check className="ml-2 w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };
// }
