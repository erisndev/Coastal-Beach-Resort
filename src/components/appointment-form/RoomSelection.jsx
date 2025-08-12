import React from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

export const RoomSelection = ({
  bookingData,
  setBookingData,
  onNext,
  onPrev,
  rooms,
  calculateNights,
}) => {
  const handleRoomSelect = (room) => {
    setBookingData((prev) => ({ ...prev, selectedRoom: room }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select Your Room
        </h2>
        <p className="text-gray-600">
          {calculateNights()} nights •{" "}
          {bookingData.adults + bookingData.children} guests
        </p>
      </div>

      <div className="grid gap-6">
        {rooms.length === 0 ? (
          <p className="text-center text-red-600 font-semibold">
            No rooms available for your selection.
          </p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                bookingData.selectedRoom?.id === room.id
                  ? "border-amber-500 bg-amber-50"
                  : room.available
                  ? "border-gray-300 hover:border-gray-400"
                  : "border-gray-200 bg-gray-50"
              }`}
              onClick={() => room.available && handleRoomSelect(room)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-4xl mr-4">{room.image}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {room.name}
                      </h3>
                      <p className="text-gray-600">
                        Up to {room.capacity} guests
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">
                    R{room.price}
                  </div>
                  <div className="text-sm text-gray-600">per night</div>
                  {!room.available && (
                    <div className="text-red-500 font-medium mt-2">
                      Not Available
                    </div>
                  )}
                  {bookingData.selectedRoom?.id === room.id && (
                    <div className="text-amber-600 font-medium mt-2 flex items-center">
                      <Check className="w-4 h-4 mr-1" /> Selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
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
          disabled={!bookingData.selectedRoom}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Continue to Guest Details
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
