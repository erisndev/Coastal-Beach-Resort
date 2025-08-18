// import React, { useState } from "react";
// import { Calendar, Users, ArrowRight, Loader2 } from "lucide-react";
// import { checkRoomAvailability } from "../../API/Api";
// import { toast } from "react-toastify";

// export const DateGuestSelection = ({
//   bookingData,
//   setBookingData,
//   onNext,
//   setRooms,
// }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDateChange = (field, value) => {
//     setBookingData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleGuestChange = (field, value) => {
//     setBookingData((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
//   };

//   const handleSearch = async () => {
//     if (!bookingData.checkIn || !bookingData.checkOut) {
//       alert("Please select check-in and check-out dates.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const guestCount = bookingData.adults + bookingData.children;

//       const searchData = {
//         roomTypeId: null,
//         checkIn: bookingData.checkIn,
//         checkOut: bookingData.checkOut,
//         guests: guestCount,
//       };
//       console.log("Searching rooms with data: ", searchData);

//       // ✅ Call backend to fetch available rooms
//       const availableRooms = await checkRoomAvailability(
//         searchData.roomTypeId,
//         searchData.checkIn,
//         searchData.checkOut,
//         searchData.guests
//       );

//       if (availableRooms.length === 0) {
//         toast.warn("No rooms available for selected dates and guests.");
//         setRooms([]);
//       } else {
//         // Map backend fields to frontend-friendly format
//         const formattedRooms = availableRooms.map((room) => ({
//           _id: room._id,
//           name: room.name,
//           capacity: room.capacity,
//           price: room.pricePerNight,
//           amenities: room.amenities,
//           totalUnits: room.totalUnits,
//         }));

//         console.log("Rooms found:", formattedRooms);

//         setRooms(formattedRooms);

//         toast.success("Rooms searched successfully!");
//         onNext(); // move to next step (RoomSelection)
//       }
//     } catch (error) {
//       console.error("Error searching rooms:", error);
//       toast.error("Unable to search rooms. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Book Your Stay
//         </h2>
//         <p className="text-gray-600">Select your dates and number of guests</p>
//       </div>

//       <div className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Calendar className="inline w-4 h-4 mr-1" />
//               Check-in Date
//             </label>
//             <input
//               type="date"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//               value={bookingData.checkIn}
//               onChange={(e) => handleDateChange("checkIn", e.target.value)}
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Calendar className="inline w-4 h-4 mr-1" />
//               Check-out Date
//             </label>
//             <input
//               type="date"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//               value={bookingData.checkOut}
//               onChange={(e) => handleDateChange("checkOut", e.target.value)}
//               min={
//                 bookingData.checkIn || new Date().toISOString().split("T")[0]
//               }
//             />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Users className="inline w-4 h-4 mr-1" />
//               Adults
//             </label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//               value={bookingData.adults}
//               onChange={(e) => handleGuestChange("adults", e.target.value)}
//             >
//               {[1, 2, 3, 4, 5, 6].map((num) => (
//                 <option key={num} value={num}>
//                   {num} Adult{num > 1 ? "s" : ""}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Users className="inline w-4 h-4 mr-1" />
//               Children
//             </label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//               value={bookingData.children}
//               onChange={(e) => handleGuestChange("children", e.target.value)}
//             >
//               {[0, 1, 2, 3, 4].map((num) => (
//                 <option key={num} value={num}>
//                   {num} Child{num !== 1 ? "ren" : ""}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 text-center px-4 sm:px-0">
//         <button
//           onClick={handleSearch}
//           disabled={!bookingData.checkIn || !bookingData.checkOut || loading}
//           className="bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto max-w-full sm:max-w-xs"
//           style={{ minWidth: "200px" }}
//         >
//           {loading ? (
//             <>
//               <Loader2 className="animate-spin mr-2 w-4 h-4" />
//               Searching...
//             </>
//           ) : (
//             <>
//               Search Available Rooms
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { Calendar, Users, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { checkRoomAvailability } from "../../API/Api";

export const DateGuestSelection = ({
bookingData,
setBookingData,
onNext,
setRooms,
setAvailableUnits, // Store full list of available units
}) => {
  const [loading, setLoading] = useState(false);

  const handleDateChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuestChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const handleSearch = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    // reset selection on new search
    setBookingData((prev) => ({ ...prev, selectedRoom: null }));
    setLoading(true);
    try {
      const guests = (parseInt(bookingData.adults, 10) || 0) + (parseInt(bookingData.children, 10) || 0);

      const available = await checkRoomAvailability(
        null,
        bookingData.checkIn,
        bookingData.checkOut,
        guests
      );

      // Normalize API response to an array
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

      // Store the full list of available units for booking
      setAvailableUnits(list);

      // Group units by room type for display
      const byType = new Map();
      list.forEach((r) => {
        const typeId = r.roomTypeId || r.roomType?._id || r.typeId || r.roomType || r._id;
        const key = String(typeId);
        const existing = byType.get(key);
        const name = r.roomType?.name || r.name || "Room";
        const capacity = r.roomType?.capacity ?? r.capacity ?? 0;
        const price = r.roomType?.pricePerNight ?? r.pricePerNight ?? r.price ?? 0;
        const description = r.roomType?.description || r.description || "";
        const amenities = r.roomType?.amenities || r.amenities || [];
        const totalUnits = r.roomType?.totalUnits ?? r.totalUnits;
        
        if (existing) {
          existing.availableUnits = (existing.availableUnits || 1) + 1;
          // Store available unit IDs for this type
          if (!existing.unitIds) existing.unitIds = [];
          existing.unitIds.push(r._id);
          // keep the lowest price as representative if prices differ
          if (price && price < existing.price) existing.price = price;
        } else {
          byType.set(key, {
            _id: key, // room type ID
            roomTypeId: typeId,
            name,
            capacity,
            price,
            description,
            amenities,
            totalUnits,
            availableUnits: 1,
            unitIds: [r._id], // Available unit IDs for this type
          });
        }
      });

      let formattedRooms = Array.from(byType.values());

      // Fallback: if grouping produced nothing but list has entries, map directly
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
                bookingData.checkIn || new Date().toISOString().split("T")[0]
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
