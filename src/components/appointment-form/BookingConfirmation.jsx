import React, { useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  Users,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import { createBooking } from "../../API/Api";

export const BookingConfirmation = ({
  bookingData,
  setBookingData,
  onPrev,
  onNext,
  calculateNights,
  calculateTotal,
  setAvailableUnits,
}) => {
  const [loading, setLoading] = useState(false);
  const guestList = {
    adults: parseInt(bookingData.adults, 10) || 0,
    children: parseInt(bookingData.children, 10) || 0,
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Clean guestDetails by removing empty fields
      const guestDetails = { ...bookingData.guestDetails };
      Object.keys(guestDetails).forEach((key) => {
        if (!guestDetails[key]) delete guestDetails[key];
      });

      // Ensure guestList is always present and correct
      const guestList = {
        adults: parseInt(bookingData.adults, 10) || 0,
        children: parseInt(bookingData.children, 10) || 0,
      };

      const payload = {
        roomId:
          bookingData.selectedRoom.selectedRoomId ||
          bookingData.selectedRoom._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: guestList.adults + guestList.children, // total guests
        guestList, // send full guest breakdown
        guestDetails,
        totalPrice: calculateTotal(),
      };

      console.log("Sanitized booking payload:", payload);

      const response = await createBooking(payload);

      // Save booking and payment reference
      setBookingData((prev) => ({
        ...prev,
        bookingId: response.booking._id,
        paymentReference: response.booking.payment.reference,
      }));

      toast.success("Booking created! Proceed to payment.");
      console.log("Payment reference:", response.booking.payment.reference);

      // Remove booked unit from availability
      setAvailableUnits((prev) =>
        prev.filter((unit) => unit._id !== payload.roomId)
      );

      onNext(); // proceed to payment
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error(error.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-slate-600 text-lg">
          Review your booking details before confirming
        </p>
      </div>

      {/* Booking Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Stay Details */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-800">Stay Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Check-in:</span>
              <span className="font-semibold text-slate-800">
                {new Date(bookingData.checkIn).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Check-out:</span>
              <span className="font-semibold text-slate-800">
                {new Date(bookingData.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Duration:</span>
              <span className="font-semibold text-slate-800">
                {calculateNights()} nights
              </span>
            </div>
          </div>
        </div>

        {/* Room & Guests */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-slate-800">Room & Guests</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Room:</span>
              <span className="font-semibold text-slate-800">
                {bookingData.selectedRoom.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Adults:</span>
              <span className="font-semibold text-slate-800">
                {guestList.adults}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Children:</span>
              <span className="font-semibold text-slate-800">
                {guestList.children}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Info */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 border border-amber-200 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-slate-800">
            Guest Information
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 mb-3">
              Personal Details
            </h4>
            {[
              "firstName",
              "lastName",
              "email",
              "phone",
              "dateOfBirth",
              "gender",
            ].map((field) =>
              bookingData.guestDetails[field] ? (
                <div key={field} className="flex items-center gap-3">
                  {field === "email" ? (
                    <Mail className="w-4 h-4 text-slate-500" />
                  ) : (
                    <User className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-slate-600">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {bookingData.guestDetails[field]}
                  </span>
                </div>
              ) : null
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 mb-3">Address</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-slate-800 font-semibold">
                  {bookingData.guestDetails.address}
                </div>
                <div className="text-slate-600">
                  {bookingData.guestDetails.city}
                  {bookingData.guestDetails.state &&
                    `, ${bookingData.guestDetails.state}`}
                  {bookingData.guestDetails.postalCode &&
                    ` ${bookingData.guestDetails.postalCode}`}
                </div>
                <div className="text-slate-600">
                  {bookingData.guestDetails.country}
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookingData.guestDetails.specialRequests && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
            <h4 className="font-semibold text-slate-700 mb-2">
              Special Requests
            </h4>
            <p className="text-slate-600">
              {bookingData.guestDetails.specialRequests}
            </p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          💰 Pricing Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Price per night:</span>
            <span className="font-semibold text-slate-800">
              R{bookingData.selectedRoom.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Number of nights:</span>
            <span className="font-semibold text-slate-800">
              {calculateNights()}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-slate-800">
                Total Amount:
              </span>
              <span className="text-3xl font-bold text-green-600">
                R{calculateTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-600 font-semibold hover:border-slate-400 hover:text-slate-700 transition-all duration-200 hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg disabled:shadow-none transform hover:scale-105 disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Processing...
            </>
          ) : (
            <>
              Confirm Booking
              <Calendar className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
