import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parseISO, format, startOfWeek, getDay, parse } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { fetchBookings, fetchRoomTypes } from "../../API/Api";

// Modal for single booking details
const BookingModal = ({ booking, onClose }) => {
  if (!booking) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-80 text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-bold mb-4">
          {booking.guestDetails.firstName} {booking.guestDetails.lastName}
        </h2>
        <p>
          <strong>Room:</strong> {booking.roomTypeName || "Unknown"}
        </p>
        <p>
          <strong>Check-In:</strong> {format(parseISO(booking.checkIn), "PPP")}
        </p>
        <p>
          <strong>Check-Out:</strong>{" "}
          {format(parseISO(booking.checkOut), "PPP")}
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          <span
            className={`font-semibold ${
              booking.status === "paid"
                ? "text-green-600 dark:text-green-400"
                : booking.status === "cancelled"
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {booking.status === "paid"
              ? "Paid"
              : booking.status === "cancelled"
              ? "Cancelled"
              : "Pending"}
          </span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Event dot component
const EventDot = ({ event }) => {
  let color = "#3B82F6"; // default blue
  if (event.status === "paid") color = "#10B981";
  if (event.status === "pending") color = "#F59E0B";
  if (event.status === "cancelled") color = "#EF4444";

  return (
    <span
      className="inline-block w-3 h-3 rounded-full mr-1 mb-1"
      style={{ backgroundColor: color }}
    />
  );
};

// Custom month event renderer
const MonthEvent = ({ event, onClick }) => (
  <div
    className="flex items-center cursor-pointer"
    onClick={() => onClick(event)}
  >
    <EventDot event={event} />
    <span className="truncate">{event.title}</span>
  </div>
);

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load bookings and room types
  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingsData, roomTypesData] = await Promise.all([
          fetchBookings(),
          fetchRoomTypes(),
        ]);
        setRoomTypes(roomTypesData || []);

        const getRoomTypeName = (booking) => {
          if (booking.room?.roomType?.name) return booking.room.roomType.name;
          if (booking.room?.name) return booking.room.name;
          if (booking.roomType?.name) return booking.roomType.name;
          if (
            booking.room?.roomType &&
            typeof booking.room.roomType === "string"
          ) {
            const roomType = roomTypesData.find(
              (rt) => rt._id === booking.room.roomType
            );
            if (roomType) return roomType.name;
          }
          return "Unknown Room";
        };

        const bookingsWithRoom = (bookingsData || []).map((b) => ({
          ...b,
          roomTypeName: getRoomTypeName(b),
        }));
        setBookings(bookingsWithRoom);
      } catch (err) {
        console.error("Error loading bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <p className="text-gray-500 dark:text-gray-300">Loading calendar...</p>
    );

  const resources = roomTypes.map((rt) => ({
    resourceId: rt.name,
    resourceTitle: rt.name,
  }));

  const events = bookings.map((b) => ({
    id: b._id,
    title: `${b.guestDetails.firstName} ${b.guestDetails.lastName}`,
    start: new Date(b.checkIn),
    end: new Date(b.checkOut),
    status: b.status,
    resourceId: b.roomTypeName,
  }));

  const handleSelectEvent = (event) => {
    const booking = bookings.find((b) => b._id === event.id);
    setSelectedBooking(booking);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Bookings Calendar
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        resources={resources}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        popup
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => {
          let backgroundColor = "#3B82F6";
          if (event.status === "paid") backgroundColor = "#10B981";
          if (event.status === "pending") backgroundColor = "#F59E0B";
          if (event.status === "cancelled") backgroundColor = "#EF4444";
          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: 6,
              border: "none",
            },
          };
        }}
        components={{
          month: {
            event: (props) => (
              <MonthEvent {...props} onClick={handleSelectEvent} />
            ),
          },
        }}
        dayPropGetter={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const d = new Date(date);
          d.setHours(0, 0, 0, 0);
          if (d.getTime() === today.getTime())
            return {
              className:
                "bg-blue-200 dark:bg-blue-900 text-gray-900 dark:text-white rounded",
            };
          return {};
        }}
      />
      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};
