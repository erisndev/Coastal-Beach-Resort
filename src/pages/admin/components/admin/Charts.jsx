import React, { useEffect, useState } from "react";
import { fetchBookings } from "../../../../API/Api";
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
} from "recharts";

const Charts = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookingsData = async () => {
      try {
        const bookings = await fetchBookings();

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
      } catch (err) {
        console.error("Error fetching bookings for charts:", err);
      } finally {
        setLoading(false);
      }
    };

    getBookingsData();
  }, []);

  if (loading) return <p>Loading charts...</p>;

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
    </div>
  );
};

export default Charts;
