import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-5xl mx-4 my-8 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 z-10"
        >
          ✕
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
