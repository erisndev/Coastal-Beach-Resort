// src/pages/admin/Rooms.jsx
import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import RoomTable from "../admin/components/admin/RoomTable";
import RoomForm from "../admin/components/admin/RoomForm";
import {
  fetchRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  fetchBookings,
  checkRoomAvailability,
} from "../../API/Api";

export const Rooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editRoomType, setEditRoomType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const [roomTypesData, bookingsData] = await Promise.all([
        fetchRoomTypes(),
        fetchBookings(),
      ]);

      const roomTypesArray = Array.isArray(roomTypesData) ? roomTypesData : [];
      const bookingsArray = Array.isArray(bookingsData) ? bookingsData : [];

      // Calculate real-time availability by counting booked rooms
      const roomTypesWithAvailability = roomTypesArray.map((roomType) => {
        // Count currently booked rooms for this room type
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const relevantBookings = bookingsArray.filter((booking) => {
          // Check if booking is for this room type
          const bookingRoomTypeId = booking.room?.roomType?._id;
          const isThisRoomType = bookingRoomTypeId === roomType._id;

          if (!isThisRoomType) return false;

          // Count all confirmed bookings (not cancelled) that haven't checked out yet
          const checkOut = new Date(booking.checkOut);
          checkOut.setHours(0, 0, 0, 0);

          // Booking affects availability if:
          // 1. It's confirmed (not cancelled)
          // 2. Check-out date hasn't passed (room is still occupied or will be occupied)
          const isConfirmed = booking.status !== "cancelled";
          const hasNotCheckedOut = checkOut > today;
          const affectsAvailability = isConfirmed && hasNotCheckedOut;

          return affectsAvailability;
        });

        const bookedCount = relevantBookings.length;
        const availableCount = Math.max(
          0,
          (roomType.totalUnits || 0) - bookedCount
        );

        return {
          ...roomType,
          availableUnits: availableCount,
          bookedUnits: bookedCount,
        };
      });

      setRoomTypes(roomTypesWithAvailability);
    } catch (err) {
      console.error(err);
      setError("Failed to load room types. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = () => {
    setEditRoomType(null);
    setIsFormOpen(true);
    setSuccessMsg(null);
  };

  const handleEditRoom = (room) => {
    setEditRoomType(room);
    setIsFormOpen(true);
    setSuccessMsg(null);
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Delete this room type?")) return;
    setError(null);
    try {
      await deleteRoomType(id);
      setRoomTypes((prev) => prev.filter((r) => r._id !== id));
      setSuccessMsg("Room type deleted.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete room type.");
    }
  };

  const handleFormSubmit = async (roomData) => {
    setSaving(true);
    setError(null);
    try {
      if (editRoomType) {
        await updateRoomType(editRoomType._id, roomData);
        setSuccessMsg("Room type updated.");
      } else {
        // createRoomType on backend will auto-create Room units based on totalUnits
        await createRoomType(roomData);
        setSuccessMsg("Room type created and units generated.");
      }
      setIsFormOpen(false);
      setEditRoomType(null);
      await loadRoomTypes();
    } catch (err) {
      console.error(err);
      setError("Failed to save room type. Check inputs and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Room Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create room types — units will be created automatically based on
            Total Units.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && (
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm">
              {successMsg}
            </div>
          )}
          {error && (
            <div className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <button
            onClick={loadRoomTypes}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleAddRoom}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Add Room Type
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : roomTypes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No room types yet
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Click the button to add your first room type — units will be
            generated automatically.
          </p>
          <button
            onClick={handleAddRoom}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Add Room Type
          </button>
        </div>
      ) : (
        <RoomTable
          roomTypes={roomTypes}
          onEdit={handleEditRoom}
          onDelete={handleDeleteRoom}
        />
      )}

      {isFormOpen && (
        <RoomForm
          roomType={editRoomType}
          onClose={() => {
            setIsFormOpen(false);
            setEditRoomType(null);
          }}
          onSubmit={handleFormSubmit}
          saving={saving}
        />
      )}
    </div>
  );
};

export default Rooms;
