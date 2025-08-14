import React, { useEffect, useState } from "react";
import { fetchBookings } from "../../../../API/Api";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500 dark:text-gray-300">Loading bookings...</p>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-300">No bookings found.</p>
    );
  }

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="text-left border-b border-gray-200 dark:border-gray-700">
          <th className="p-3">Guest</th>
          <th className="p-3">Room</th>
          <th className="p-3">Check-In</th>
          <th className="p-3">Check-Out</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr
            key={b._id}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <td className="p-3">
              {b.guestDetails?.firstName} {b.guestDetails?.lastName}
            </td>
            <td className="p-3">{b.room?.name || "N/A"}</td>
            <td className="p-3">{new Date(b.checkIn).toLocaleDateString()}</td>
            <td className="p-3">{new Date(b.checkOut).toLocaleDateString()}</td>
            <td
              className={`p-3 font-bold ${
                b.status === "paid" ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {b.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
