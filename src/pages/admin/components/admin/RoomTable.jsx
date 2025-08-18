// src/pages/admin/components/admin/RoomTable.jsx
import React from "react";
import { Home } from "lucide-react";

const RoomTable = ({ roomTypes, onEdit, onDelete }) => {
  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No room types to show.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Room
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Capacity
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Price
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Amenities
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Units
            </th>
            <th className="px-4 py-3 text-left text-sm text-gray-700 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {roomTypes.map((room) => (
            <tr
              key={room._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-3 flex items-center gap-3">
                <Home size={20} className="text-gray-700 dark:text-white" />
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {room.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {room.pricePerNight ? `R${room.pricePerNight}` : "-"}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {room.description || "-"}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {room.capacity}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {room.pricePerNight ? `R${room.pricePerNight}` : "-"}
              </td>

              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {room.amenities && room.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </td>

              {/* Units Column with badges */}
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded text-xs font-semibold">
                    Total: {room.totalUnits || 0}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    (room.availableUnits || 0) > 0 
                      ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                      : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100'
                  }`}>
                    Available: {room.availableUnits || 0}
                  </span>
                  {(room.bookedUnits || 0) > 0 && (
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 rounded text-xs font-semibold">
                      Booked: {room.bookedUnits || 0}
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 flex gap-2 items-center">
                <button
                  onClick={() => onEdit(room)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(room._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
