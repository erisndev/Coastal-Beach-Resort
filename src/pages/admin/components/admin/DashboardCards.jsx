import React, { useEffect, useState } from "react";
import { Users, Bed, CreditCard, List, BarChart2 } from "lucide-react";
import { fetchBookings, fetchRoomTypes } from "../../../../API/Api";

const DashboardCards = () => {
  const [data, setData] = useState({
    totalGuests: 0,
    roomsBooked: 0,
    paymentsReceived: 0,
    totalBookings: 0,
    occupancyRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const [bookings, roomTypes] = await Promise.all([
          fetchBookings(),
          fetchRoomTypes(),
        ]);

        // Only active bookings
        const activeBookings = bookings.filter((b) => b.status !== "cancelled");

        // Total Guests
        const totalGuests = activeBookings.reduce(
          (acc, b) => acc + (Number(b.guests) || 0),
          0
        );

        // Rooms Occupied (checked-in only)
        const roomsCheckedIn = activeBookings.reduce((acc, b) => {
          if (b.status === "checked-in") {
            if (b.rooms && Array.isArray(b.rooms)) return acc + b.rooms.length;
            if (b.roomCount) return acc + b.roomCount;
            return acc + 1; // fallback if single room
          }
          return acc;
        }, 0);

        // Total Rooms in Resort
        const totalRooms = roomTypes.reduce(
          (acc, rt) => acc + (rt.totalUnits || 0),
          0
        );

        // Occupancy Rate
        const occupancyRate =
          totalRooms > 0 ? Math.round((roomsCheckedIn / totalRooms) * 100) : 0;

        // Payments Received
        const paymentsReceived = activeBookings
          .filter((b) => b.payment?.status === "paid")
          .reduce((acc, b) => acc + (b.totalPrice || 0), 0);

        // Total Bookings
        const totalBookings = activeBookings.length;

        setData({
          totalGuests,
          roomsBooked: roomsCheckedIn,
          paymentsReceived,
          totalBookings,
          occupancyRate,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard data...</p>;

  const cards = [
    {
      id: 1,
      title: "Total Guests",
      value: data.totalGuests,
      icon: <Users size={24} />,
    },
    {
      id: 2,
      title: "Rooms Occupied",
      value: data.roomsBooked,
      icon: <Bed size={24} />,
    },
    {
      id: 3,
      title: "Payments Received",
      value: `$${data.paymentsReceived}`,
      icon: <CreditCard size={24} />,
    },
    {
      id: 4,
      title: "Total Bookings",
      value: data.totalBookings,
      icon: <List size={24} />,
    },
    {
      id: 5,
      title: "Occupancy Rate",
      value: `${data.occupancyRate}%`,
      icon: <BarChart2 size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 dark:text-gray-300">{card.title}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {card.value}
            </p>
          </div>
          <div className="text-blue-600 dark:text-blue-400">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
