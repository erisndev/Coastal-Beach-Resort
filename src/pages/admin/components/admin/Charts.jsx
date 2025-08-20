import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area,
  ResponsiveContainer,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchBookings, fetchRoomTypes } from "../../../../API/Api";

const Charts = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const bookings = await fetchBookings();
        const roomTypes = await fetchRoomTypes();

        // Weekly aggregation
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const now = new Date();
        const last7Days = Array.from({ length: 7 })
          .map((_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - i);
            return { day: days[d.getDay()], bookings: 0, revenue: 0 };
          })
          .reverse();

        bookings.forEach((b) => {
          const checkIn = new Date(b.checkIn);
          last7Days.forEach((day) => {
            if (checkIn.getDay() === days.indexOf(day.day)) {
              day.bookings += 1;
              day.revenue += b.totalPrice;
            }
          });
        });
        setWeeklyData(last7Days);

        // Monthly aggregation (last 6 months)
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const last6Months = Array.from({ length: 6 })
          .map((_, i) => {
            const d = new Date();
            d.setMonth(now.getMonth() - i);
            return { month: months[d.getMonth()], revenue: 0 };
          })
          .reverse();

        bookings.forEach((b) => {
          const checkIn = new Date(b.checkIn);
          last6Months.forEach((m) => {
            if (checkIn.getMonth() === months.indexOf(m.month)) {
              m.revenue += b.totalPrice;
            }
          });
        });
        setMonthlyData(last6Months);

        // Pie chart: Room type distribution
        const roomTypeCount = roomTypes.map((rt) => {
          const count = bookings.filter(
            (b) =>
              b.roomType?.name === rt.name || b.room?.roomType?.name === rt.name
          ).length;
          return { name: rt.name, value: count };
        });
        setRoomTypeData(roomTypeCount);

        // Pie chart: Booking status distribution
        const statusCount = [
          "confirmed",
          "checked-in",
          "completed",
          "cancelled",
        ].map((status) => {
          const count = bookings.filter((b) => {
            if (b.status === "cancelled") return status === "cancelled";
            const today = new Date();
            const checkIn = new Date(b.checkIn);
            const checkOut = new Date(b.checkOut);
            today.setHours(0, 0, 0, 0);
            checkIn.setHours(0, 0, 0, 0);
            checkOut.setHours(0, 0, 0, 0);

            if (status === "completed") return checkOut < today;
            if (status === "checked-in")
              return checkIn <= today && checkOut >= today;
            if (status === "confirmed") return checkIn > today;
            return false;
          }).length;
          return { name: status, value: count };
        });
        setStatusData(statusCount);
      } catch (err) {
        console.error("Error loading charts:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading charts...</p>;

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]; // Blue, Green, Yellow, Red

  return (
    <div className="space-y-8 p-6">
      {/* Weekly Composed Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Weekly Performance
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={weeklyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="bookings"
              fill="#3b82f6"
              name="Bookings"
              radius={4}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Revenue ($)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Monthly Revenue
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Type Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Room Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roomTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Booking Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
