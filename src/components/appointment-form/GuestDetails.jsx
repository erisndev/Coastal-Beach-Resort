import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Step 3 Component: Guest Details
export const GuestDetails = ({
  bookingData,
  setBookingData,
  onNext,
  onPrev,
}) => {
  const handleGuestDetailsChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      guestDetails: { ...prev.guestDetails, [field]: value },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Guest Details</h2>
        <p className="text-gray-600">Please provide your contact information</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.guestDetails.firstName}
              onChange={(e) =>
                handleGuestDetailsChange("firstName", e.target.value)
              }
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.guestDetails.lastName}
              onChange={(e) =>
                handleGuestDetailsChange("lastName", e.target.value)
              }
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            value={bookingData.guestDetails.email}
            onChange={(e) => handleGuestDetailsChange("email", e.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            value={bookingData.guestDetails.phone}
            onChange={(e) => handleGuestDetailsChange("phone", e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 h-24"
            value={bookingData.guestDetails.specialRequests}
            onChange={(e) =>
              handleGuestDetailsChange("specialRequests", e.target.value)
            }
            placeholder="Any special requests or requirements?"
          />
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
            !bookingData.guestDetails.firstName ||
            !bookingData.guestDetails.lastName ||
            !bookingData.guestDetails.email ||
            !bookingData.guestDetails.phone
          }
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Continue to Confirmation
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
