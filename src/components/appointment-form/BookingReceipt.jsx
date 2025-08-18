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

  const bookingId =
    "RB" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const nights = calculateNights();
  const pricePerNight = bookingData.selectedRoom?.price || 0;
  const total = calculateTotal();

  const downloadReceipt = () => {
    const receiptData = {
      bookingId,
      ...bookingData,
      total,
      nights,
      date: new Date().toLocaleDateString(),
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(receiptData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "booking-receipt.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div ref={receiptRef}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Your reservation has been successfully processed
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Booking Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guest Name:</span>
                <span className="font-medium">
                  {bookingData.guestDetails.firstName}{" "}
                  {bookingData.guestDetails.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-medium">
                  {bookingData.selectedRoom?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">
                  {new Date(bookingData.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">
                  {new Date(bookingData.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">
                  {bookingData.adults} adults, {bookingData.children} children
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="font-medium">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per night:</span>
                <span className="font-medium">
                  R{pricePerNight.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-700 font-semibold">Total:</span>
                <span className="font-extrabold text-amber-600 text-xl">
                  R{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-amber-800 text-sm">
              📧 A confirmation email has been sent to{" "}
              {bookingData.guestDetails.email}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={downloadReceipt}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 flex items-center mx-auto mb-4"
        >
          <Download className="mr-2 w-4 h-4" />
          Download JSON
        </button>
        <button
          onClick={onStartOver}
          className="text-gray-600 hover:text-gray-800 underline"
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );
};
