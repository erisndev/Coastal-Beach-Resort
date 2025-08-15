// import React from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// export const RoomSelection = ({
//   rooms,
//   bookingData,
//   setBookingData,
//   onNext,
//   onPrev,
// }) => {
//   const handleSelectRoom = (room) => {
//     setBookingData((prev) => ({ ...prev, selectedRoom: room }));
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Select a Room</h2>
//         <p className="text-gray-600">Available rooms for your stay</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {rooms.length === 0 && <p>No rooms available.</p>}
//         {rooms.map((room) => (
//           <div
//             key={room._id}
//             onClick={() => handleSelectRoom(room)}
//             className={`p-4 border rounded-lg cursor-pointer ${
//               bookingData.selectedRoom?._id === room._id
//                 ? "border-amber-600 bg-amber-50"
//                 : "border-gray-300 hover:border-amber-500"
//             }`}
//           >
//             <div className="font-medium text-gray-800">{room.name}</div>
//             <div className="text-gray-600">Capacity: {room.capacity}</div>
//             <div className="text-gray-600">Price: R{room.price} per night</div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex justify-between">
//         <button
//           onClick={onPrev}
//           className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center"
//         >
//           <ArrowLeft className="mr-2 w-4 h-4" />
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           disabled={!bookingData.selectedRoom}
//           className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 flex items-center"
//         >
//           Continue
//           <ArrowRight className="ml-2 w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };
import React from "react";

export const RoomSelection = ({
  bookingData,
  setBookingData,
  rooms,
  onNext,
  onPrev,
}) => {
  const handleSelectRoom = (room) => {
    setBookingData((prev) => ({ ...prev, selectedRoom: room }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Select Your Room
      </h2>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">
          No rooms available for selected dates and guests.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-lg transition ${
                bookingData.selectedRoom?._id === room._id
                  ? "border-amber-500 shadow-lg"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectRoom(room)}
            >
              <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-2">{room.description}</p>
              <p className="font-bold text-gray-800">
                Price per night: R{room.price}
              </p>
              <p className="text-gray-600">Capacity: {room.capacity} guests</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!bookingData.selectedRoom}
          className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
