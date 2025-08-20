import { fetchBookingById, fetchRoomTypes } from "@/API/Api";
import React, { useEffect, useState } from "react";

export const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const [bookingData, roomTypesData] = await Promise.all([
          fetchBookingById(bookingId),
          fetchRoomTypes(),
        ]);
        setBooking(bookingData);
        setRoomTypes(roomTypesData || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };
    loadBookingData();
  }, [bookingId]);

  const getRoomTypeName = (booking) => {
    if (booking.room?.roomType?.name) return booking.room.roomType.name;
    if (booking.room?.name) return booking.room.name;
    if (booking.roomType?.name) return booking.roomType.name;
    if (booking.room?.roomType && typeof booking.room.roomType === "string") {
      const roomType = roomTypes.find((rt) => rt._id === booking.room.roomType);
      if (roomType) return roomType.name;
    }
    return "Unknown Room";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateNights = () => {
    if (!booking?.checkIn || !booking?.checkOut) return 0;
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      paid: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    };

    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold border ${
          statusColors[status?.toLowerCase()] ||
          "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-stone-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg w-1/3 mb-8"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 rounded-lg w-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-stone-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-12 text-center shadow-xl">
            <div className="text-red-700 text-2xl font-bold mb-4">
              Error Loading Booking
            </div>
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-stone-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-12 text-center shadow-xl">
            <div className="text-gray-700 text-2xl font-bold">
              Booking not found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-stone-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden booking-details-container"
            id="booking-details"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-10 py-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold mb-3">
                    Booking Confirmation
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Reference:{" "}
                    <span className="font-mono font-semibold">
                      {booking.payment?.reference || "N/A"}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start lg:justify-end">
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            </div>

            <div className="p-10">
              {/* Guest Information */}
              <div className="mb-12 print-section">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-100 pb-3">
                  Guest Information
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Personal Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          Full Name
                        </span>
                        <span className="text-lg font-semibold text-gray-800">
                          {booking.guestDetails.firstName}{" "}
                          {booking.guestDetails.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          Email Address
                        </span>
                        <span className="text-lg text-gray-800">
                          {booking.guestDetails.email}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          Phone Number
                        </span>
                        <span className="text-lg text-gray-800">
                          {booking.guestDetails.phone || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Address Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          Street Address
                        </span>
                        <span className="text-lg text-gray-800">
                          {booking.guestDetails.address || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          City
                        </span>
                        <span className="text-lg text-gray-800">
                          {booking.guestDetails.city || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">
                          Country
                        </span>
                        <span className="text-lg text-gray-800">
                          {booking.guestDetails.country || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-12 print-section">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-100 pb-3">
                  Booking Details
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Stay Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm text-blue-600 mb-1">
                          Room Type
                        </span>
                        <span className="text-lg font-semibold text-blue-800">
                          {getRoomTypeName(booking)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-blue-600 mb-1">
                          Check In
                        </span>
                        <span className="text-lg font-medium text-blue-800">
                          {formatDate(booking.checkIn)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-blue-600 mb-1">
                          Check Out
                        </span>
                        <span className="text-lg font-medium text-blue-800">
                          {formatDate(booking.checkOut)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-blue-600 mb-1">
                          Duration
                        </span>
                        <span className="text-lg font-semibold text-blue-800">
                          {calculateNights()} night(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">
                      Guest Count
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm text-purple-600 mb-1">
                          Adults
                        </span>
                        <span className="text-2xl font-bold text-purple-800">
                          {booking.guestList?.adults || booking.adults || 0}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-purple-600 mb-1">
                          Children
                        </span>
                        <span className="text-2xl font-bold text-purple-800">
                          {booking.guestList?.children || booking.children || 0}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-purple-600 mb-1">
                          Total Guests
                        </span>
                        <span className="text-2xl font-bold text-purple-800">
                          {booking.guests ||
                            (booking.guestList?.adults || booking.adults || 0) +
                              (booking.guestList?.children ||
                                booking.children ||
                                0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-12 print-section">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-100 pb-3">
                  Payment Information
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <span className="block text-sm text-green-600 mb-2">
                          Total Amount
                        </span>
                        <span className="text-4xl font-bold text-green-700">
                          R{booking.totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-green-600 mb-2">
                          Payment Status
                        </span>
                        <span className="text-xl font-semibold text-green-700 capitalize">
                          {booking.payment?.status || booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <span className="block text-sm text-green-600 mb-2">
                          Payment Reference
                        </span>
                        <span className="font-mono text-lg bg-white px-4 py-2 rounded-lg border border-green-300 block">
                          {booking.payment?.reference || "N/A"}
                        </span>
                      </div>
                      {booking.payment?.paidAt && (
                        <div>
                          <span className="block text-sm text-green-600 mb-2">
                            Payment Date
                          </span>
                          <span className="text-lg font-medium text-green-700">
                            {new Date(
                              booking.payment.paidAt
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.guestDetails.specialRequests && (
                <div className="mb-12 print-section">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-100 pb-3">
                    Special Requests
                  </h2>
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                    <p className="text-lg text-amber-800 leading-relaxed">
                      {booking.guestDetails.specialRequests}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
