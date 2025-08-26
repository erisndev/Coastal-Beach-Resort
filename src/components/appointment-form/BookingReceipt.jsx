import React, { useRef } from "react";
import { Download, Check } from "lucide-react";

// Step 6 Component: Receipt
export const BookingReceipt = ({
  bookingData,
  onStartOver,
  calculateTotal,
  calculateNights,
}) => {
  const receiptRef = useRef(null);

  // Use backend payment reference if available, else generate random ID
  const bookingId = bookingData._id
    ? "RB" + bookingData._id.slice(-6).toUpperCase() // optional: short version
    : "RB" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const nights = calculateNights();
  const pricePerNight = bookingData.selectedRoom?.price || 0;
  const total = calculateTotal();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
      <div ref={receiptRef}>
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Your reservation has been successfully processed
          </p>
        </div>

        <div className="space-y-4 mb-6 sm:mb-8">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Booking Details
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-md">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Booking ID:
                </span>
                <span className="font-semibold break-all">{bookingId}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Guest Name:
                </span>
                <span className="font-semibold break-words">
                  {bookingData.guestDetails.firstName}{" "}
                  {bookingData.guestDetails.lastName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Room:
                </span>
                <span className="font-semibold break-words">
                  {bookingData.selectedRoom?.name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Check-in:
                </span>
                <span className="font-semibold">
                  {new Date(bookingData.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Check-out:
                </span>
                <span className="font-semibold">
                  {new Date(bookingData.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Guests:
                </span>
                <span className="font-semibold">
                  {bookingData.adults} adults, {bookingData.children} children
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Nights:
                </span>
                <span className="font-semibold">{nights}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Price per night:
                </span>
                <span className="font-semibold">
                  R{pricePerNight.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium sm:font-normal">
                  Payment Status:
                </span>
                <span
                  className={`font-semibold ${
                    bookingData.payment?.status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {bookingData.payment?.status === "paid"
                    ? "Paid ✅"
                    : "Pending ⚠️"}
                </span>
              </div>
              {bookingData.payment?.transaction && (
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="text-gray-600 font-medium sm:font-normal">
                    Transaction ID:
                  </span>
                  <span className="font-semibold break-all">
                    {bookingData.payment.transaction}
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-200 mt-3 sm:mt-4">
                <span className="text-gray-700 font-semibold text-sm sm:text-base">
                  Total:
                </span>
                <span className="font-extrabold text-amber-600 text-lg sm:text-xl">
                  R{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
            <p className="text-amber-800 text-xs sm:text-sm break-words">
              📧 A confirmation email has been sent to{" "}
              <span className="font-semibold break-all">
                {bookingData.guestDetails.email}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 space-y-3 sm:space-y-4">
        <div>
          <button
            onClick={onStartOver}
            className="text-gray-600 hover:text-gray-800 underline text-sm sm:text-base transition-colors duration-200"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    </div>
  );
};
