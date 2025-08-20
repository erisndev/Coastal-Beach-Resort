import React from "react";

export const PaymentKPIs = ({
  totalRevenue,
  paidCount,
  pendingCount,
  cancelledCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl shadow border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Total Revenue
        </p>
        <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          R{totalRevenue.toLocaleString()}
        </p>
      </div>
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl shadow border border-green-200 dark:border-green-800">
        <p className="text-sm text-gray-500 dark:text-gray-300">Paid</p>
        <p className="text-2xl font-bold text-green-700 dark:text-green-400">
          {paidCount}
        </p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl shadow border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-gray-500 dark:text-gray-300">Pending</p>
        <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
          {pendingCount}
        </p>
      </div>
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl shadow border border-red-200 dark:border-red-800">
        <p className="text-sm text-gray-500 dark:text-gray-300">Cancelled</p>
        <p className="text-2xl font-bold text-red-700 dark:text-red-400">
          {cancelledCount}
        </p>
      </div>
    </div>
  );
};
