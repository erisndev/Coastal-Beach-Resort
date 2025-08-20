import React, { useState } from "react";
import { Calendar, Users, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { checkRoomAvailability } from "../../API/Api";

export const DateGuestSelection = ({
  bookingData,
  setBookingData,
  onNext,
  setRooms,
  setAvailableUnits,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDateChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuestChange = (field, value) => {
    const parsed = Math.max(parseInt(value) || 0, 0); // ensure >=0
    setBookingData((prev) => {
      const newGuestList = { ...prev.guestList, [field]: parsed };
      const totalGuests =
        (newGuestList.adults || 0) + (newGuestList.children || 0) || 1;
      return {
        ...prev,
        [field]: parsed,
        guestList: newGuestList,
        guests: totalGuests,
      };
    });
  };

  const handleSearch = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.warn("Please select check-in and check-out dates.");
      return;
    }
    if (bookingData.checkIn === bookingData.checkOut) {
      toast.warn("Check-out date must be after check-in date.");
      return;
    }

    setBookingData((prev) => ({ ...prev, selectedRoom: null }));
    setLoading(true);

    try {
      const guests =
        (bookingData.guestList?.adults || 0) +
          (bookingData.guestList?.children || 0) || 1;

      // Pass guestList as well if backend expects it
      const available = await checkRoomAvailability(
        null,
        bookingData.checkIn,
        bookingData.checkOut,
        guests,
        bookingData.guestList
      );

      // Normalize API response
      const list = Array.isArray(available)
        ? available
        : Array.isArray(available?.data)
        ? available.data
        : Array.isArray(available?.results)
        ? available.results
        : Array.isArray(available?.roomTypes)
        ? available.roomTypes
        : Array.isArray(available?.rooms)
        ? available.rooms
        : [];

      // Store full list
      setAvailableUnits(list);

      // Group by room type
      const byType = new Map();
      list.forEach((r) => {
        const typeId = r.roomTypeId || r.roomType?._id || r._id;
        const key = String(typeId);
        const existing = byType.get(key);
        const name = r.roomType?.name || r.name || "Room";
        const capacity = r.roomType?.capacity ?? r.capacity ?? 0;
        const price =
          r.roomType?.pricePerNight ?? r.pricePerNight ?? r.price ?? 0;
        const description = r.roomType?.description || r.description || "";
        const amenities = r.roomType?.amenities || r.amenities || [];
        const totalUnits = r.roomType?.totalUnits ?? r.totalUnits;

        if (existing) {
          existing.availableUnits += 1;
          existing.unitIds.push(r._id);
          if (price && price < existing.price) existing.price = price;
        } else {
          byType.set(key, {
            _id: key,
            roomTypeId: typeId,
            name,
            capacity,
            price,
            description,
            amenities,
            totalUnits,
            availableUnits: 1,
            unitIds: [r._id],
          });
        }
      });

      let formattedRooms = Array.from(byType.values());
      if (!formattedRooms.length && list.length) {
        formattedRooms = list.map((r) => ({
          _id: String(r.roomTypeId || r._id),
          roomTypeId: r.roomTypeId || r.roomType?._id || r._id,
          name: r.roomType?.name || r.name || "Room",
          capacity: r.roomType?.capacity ?? r.capacity ?? 0,
          price: r.roomType?.pricePerNight ?? r.pricePerNight ?? r.price ?? 0,
          description: r.roomType?.description || r.description || "",
          amenities: r.roomType?.amenities || r.amenities || [],
          totalUnits: r.roomType?.totalUnits ?? r.totalUnits,
          availableUnits: 1,
          unitIds: [r._id],
        }));
      }

      if (!formattedRooms.length) {
        toast.warn("No rooms available for selected dates and guests.");
        setRooms([]);
        setAvailableUnits([]);
        return;
      }

      setRooms(formattedRooms);
      toast.success("Rooms found!");
      onNext();
    } catch (err) {
      console.error("Error searching rooms:", err);
      toast.error("Unable to search rooms. Please try again.");
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

      {/* Date pickers */}
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
                bookingData.checkIn
                  ? new Date(
                      new Date(bookingData.checkIn).getTime() +
                        24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
            />
          </div>
        </div>

        {/* Guests selection */}
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

        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin w-5 h-5" />}
          Search Rooms
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
