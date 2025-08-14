import React, { useState } from "react";
import PaymentTable from "../admin/components/admin/PaymentTable";
import PaymentForm from "../admin/components/admin/PaymentForm";

export const Payments = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  const handleAddPayment = () => {
    setEditPayment(null);
    setIsFormOpen(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Payments
        </h1>
        <button
          onClick={handleAddPayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Payment
        </button>
      </div>
      <PaymentTable onEdit={handleEditPayment} />
      {isFormOpen && (
        <PaymentForm
          payment={editPayment}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
