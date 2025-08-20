import React from "react";

export const PaymentTable = ({ payments }) => {
  if (!payments.length)
    return (
      <p className="text-gray-500 dark:text-gray-300">No payments found.</p>
    );

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <th className="p-3 text-gray-800 dark:text-gray-200">Guest</th>
          <th className="p-3 text-gray-800 dark:text-gray-200">Amount</th>
          <th className="p-3 text-gray-800 dark:text-gray-200">Status</th>
          <th className="p-3 text-gray-800 dark:text-gray-200">Reference</th>
          <th className="p-3 text-gray-800 dark:text-gray-200">Check-In</th>
          <th className="p-3 text-gray-800 dark:text-gray-200">Check-Out</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr
            key={p.id}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <td className="p-3 text-gray-900 dark:text-gray-100">{p.guest}</td>
            <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">
              R{Number(p.amount).toLocaleString()}
            </td>
            <td
              className={`p-3 font-bold ${
                p.status.toLowerCase() === "paid"
                  ? "text-green-600 dark:text-green-400"
                  : p.status.toLowerCase() === "pending"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {p.status.toUpperCase()}
            </td>
            <td className="p-3 font-mono text-gray-900 dark:text-gray-100">
              {p.reference}
            </td>
            <td className="p-3 text-gray-900 dark:text-gray-100">
              {new Date(p.checkIn).toLocaleDateString()}
            </td>
            <td className="p-3 text-gray-900 dark:text-gray-100">
              {new Date(p.checkOut).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
