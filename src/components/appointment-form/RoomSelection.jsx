import React from "react";
import { Check, Users, Star } from "lucide-react";

export const RoomSelection = ({
  bookingData,
  setBookingData,
  rooms,
  availableUnits,
  onNext,
  onPrev,
}) => {
  const handleSelectRoom = (room) => {
    // Find the first available unit for this room type
    const availableUnit = availableUnits.find((unit) => {
      const unitTypeId =
        unit.roomTypeId || unit.roomType?._id || unit.typeId || unit._id;
      return String(unitTypeId) === String(room.roomTypeId || room._id);
    });

    if (availableUnit) {
      // Store both the room type info and the specific unit ID
      const selectedRoom = {
        ...room,
        selectedRoomId: availableUnit._id, // Specific unit ID for booking
        roomTypeId: room.roomTypeId || room._id, // Room type ID
      };
      setBookingData((prev) => ({ ...prev, selectedRoom }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Select Your Room
        </h2>

        {/* Room Grid */}
        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">
            No rooms available for selected dates and guests.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {rooms.map((room) => {
              const isSelected = bookingData.selectedRoom?._id === room._id;
              const price = Number(room.price ?? room.pricePerNight ?? 0);

              return (
                <div
                  key={room._id}
                  className={`group relative bg-white rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 p-6 ${
                    isSelected
                      ? "ring-2 ring-amber-400 shadow-xl shadow-amber-100/50"
                      : "shadow-lg hover:shadow-xl border border-slate-200"
                  }`}
                  onClick={() => handleSelectRoom(room)}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-amber-500 text-white rounded-full p-1.5">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Room Details */}
                  <div className="pr-12">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Features */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">
                          {room.capacity} Guests
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">
                          R{price.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">per night</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation */}
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
    </div>
  );
};
