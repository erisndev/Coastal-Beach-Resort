import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Step 4 Component: Booking Confirmation
export const BookingConfirmation = ({
  bookingData,
  onNext,
  onPrev,
  calculateNights,
  calculateTotal,
}) => {
  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    // For demo purposes, we'll just log it and alert success
    console.log("Booking Data:", bookingData);
    alert("Booking confirmed successfully!");
    onNext(); // Proceed to payment step after confirmation
  };
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-gray-600">Please review your booking details</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Summary
          </h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span className="font-medium">
                {new Date(bookingData.checkIn).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span className="font-medium">
                {new Date(bookingData.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Nights:</span>
              <span className="font-medium">{calculateNights()}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-medium">
                {bookingData.adults} adults, {bookingData.children} children
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Room Details
          </h3>
          <div className="flex items-center">
            <span className="text-2xl mr-3">
              {bookingData.selectedRoom?.image}
            </span>
            <div>
              <div className="font-medium text-gray-800">
                {bookingData.selectedRoom?.name}
              </div>
              <div className="text-gray-600">
                R{bookingData.selectedRoom?.price} per night
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Guest Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <div>
              <span className="font-medium">Name:</span>{" "}
              {bookingData.guestDetails.firstName}{" "}
              {bookingData.guestDetails.lastName}
            </div>
            <div>
              <span className="font-medium">Email:</span>{" "}
              {bookingData.guestDetails.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span>{" "}
              {bookingData.guestDetails.phone}
            </div>
            {bookingData.guestDetails.specialRequests && (
              <div>
                <span className="font-medium">Special Requests:</span>{" "}
                {bookingData.guestDetails.specialRequests}
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              Room Total ({calculateNights()} nights):
            </span>
            <span className="font-medium">
              R
              {(bookingData.selectedRoom?.price * calculateNights()).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg font-bold text-gray-800 pt-2 border-t">
            <span>Total Amount:</span>
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
          onClick={handleBooking}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 flex items-center justify-center"
        >
          Proceed to Payment
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
