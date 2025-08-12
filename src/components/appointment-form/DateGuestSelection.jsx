import React, { useState } from "react";
import { Calendar, Users, ArrowRight, Loader2 } from "lucide-react";

export const DateGuestSelection = ({
  bookingData,
  setBookingData,
  onNext,
  allRooms,
  setRooms,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDateChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuestChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const guestCount = bookingData.adults + bookingData.children;

      const filteredRooms = allRooms.filter(
        (room) => room.capacity >= guestCount && room.available
      );

      setRooms(filteredRooms);

      alert("Rooms searched successfully!");
      onNext();
    } catch (error) {
      console.error("Error searching rooms:", error);
      alert("Unable to search rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Book Your Stay
        </h2>
        <p className="text-gray-600">Select your dates and number of guests</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Check-in Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.checkIn}
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Check-out Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.checkOut}
              onChange={(e) => handleDateChange("checkOut", e.target.value)}
              min={
                bookingData.checkIn || new Date().toISOString().split("T")[0]
              }
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Adults
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.adults}
              onChange={(e) => handleGuestChange("adults", e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Adult{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Children
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={bookingData.children}
              onChange={(e) => handleGuestChange("children", e.target.value)}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} Child{num !== 1 ? "ren" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center px-4 sm:px-0">
        <button
          onClick={handleSearch}
          disabled={!bookingData.checkIn || !bookingData.checkOut || loading}
          className="bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto max-w-full sm:max-w-xs"
          style={{ minWidth: "200px" }}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-4 h-4" />
              Searching...
            </>
          ) : (
            <>
              Search Available Rooms
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
