import React, { useEffect, useState } from "react";
import { Users, Bed, CreditCard, BarChart2 } from "lucide-react";
import { fetchBookings } from "../../../../API/Api"; // import your API helper

const DashboardCards = () => {
  const [data, setData] = useState({
    totalGuests: 0,
    roomsBooked: 0,
    paymentsReceived: 0,
    analyticsViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookingsData = async () => {
      try {
        const bookings = await fetchBookings();

        const totalGuests = bookings.reduce(
          (acc, b) => acc + b.guests.adults + b.guests.children,
          0
        );

        const roomsBooked = bookings.filter((b) => b.status === "paid").length;

        const paymentsReceived = bookings
          .filter((b) => b.payment.status === "paid")
          .reduce((acc, b) => acc + b.totalPrice, 0);

        setData({
          totalGuests,
          roomsBooked,
          paymentsReceived,
          analyticsViews: 3500,
        });
      } catch (err) {
        console.error("Error fetching dashboard bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    getBookingsData();
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
      title: "Rooms Booked",
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
      title: "Analytics Views",
      value: data.analyticsViews,
      icon: <BarChart2 size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
