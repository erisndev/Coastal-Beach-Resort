import React from "react";
import { Check } from "lucide-react";

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const stepNames = [
    "Select Dates & Guests",
    "Choose Room",
    "Guest Details",
    "Confirm Booking",
    "Payment",
    "Receipt",
  ];

  const getStepStatus = (stepIndex) => {
    if (currentStep > stepIndex + 1) return "completed";
    if (currentStep === stepIndex + 1) return "active";
    return "pending";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Mobile Layout - Vertical on very small screens */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {Array.from({ length: totalSteps }, (_, i) => {
            const status = getStepStatus(i);

            return (
              <div key={i} className="flex items-center space-x-3">
                {/* Step circle */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs
                      transition-all duration-500 ease-out
                      ${
                        status === "completed"
                          ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md shadow-green-200"
                          : status === "active"
                          ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-300 animate-pulse"
                          : "bg-white border-2 border-gray-300 text-gray-500"
                      }
                    `}
                  >
                    {status === "completed" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="font-bold">{i + 1}</span>
                    )}
                  </div>
                  {status === "active" && (
                    <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 animate-ping"></div>
                  )}
                </div>

                {/* Step info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-md font-medium truncate
                      ${
                        status === "completed"
                          ? "text-green-700 font-semibold"
                          : status === "active"
                          ? "text-amber-700 font-bold"
                          : "text-white font-medium"
                      }
                    `}
                  >
                    {stepNames[i]}
                  </p>
                  {status === "active" && (
                    <p className="text-xs text-amber-700 font-medium mt-1">
                      Current Step
                    </p>
                  )}
                </div>

                {/* Connecting line */}
                {i < totalSteps - 1 && (
                  <div className="absolute left-4 mt-8 w-0.5 h-4 bg-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tablet and Desktop Layout - Horizontal */}
      <div className="hidden sm:block">
        {/* Progress Line Background */}
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-4 sm:top-5 lg:top-6 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 rounded-full"></div>

          {/* Active progress line */}
          <div
            className="absolute top-4 sm:top-5 lg:top-6 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {Array.from({ length: totalSteps }, (_, i) => {
              const status = getStepStatus(i);

              return (
                <div
                  key={i}
                  className="flex flex-col items-center group max-w-24 sm:max-w-28 lg:max-w-32"
                >
                  {/* Step circle */}
                  <div className="relative">
                    <div
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm
                        transition-all duration-500 ease-out transform
                        ${
                          status === "completed"
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200 scale-110"
                            : status === "active"
                            ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-300 scale-110 animate-pulse"
                            : "bg-white border-2 border-gray-300 text-gray-500 hover:border-gray-400"
                        }
                      `}
                    >
                      {status === "completed" ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-bounce" />
                      ) : (
                        <span className="font-bold">{i + 1}</span>
                      )}
                    </div>

                    {/* Pulse ring for active step */}
                    {status === "active" && (
                      <div className="absolute inset-0 rounded-full bg-amber-400 opacity-30 animate-ping"></div>
                    )}
                  </div>

                  {/* Step label */}
                  <div className="mt-2 sm:mt-3 lg:mt-4 text-center">
                    <p
                      className={`
                        text-md sm:text-md lg:text-md font-medium transition-all duration-300 leading-tight
                        ${
                          status === "completed"
                            ? "text-green-700 font-semibold"
                            : status === "active"
                            ? "text-amber-800 font-bold"
                            : "text-white font-medium"
                        }
                      `}
                    >
                      <span className="sm:hidden">
                        {stepNames[i].split(" ")[0]}
                      </span>
                      <span className="hidden sm:inline lg:hidden">
                        {stepNames[i].length > 12
                          ? stepNames[i].substring(0, 12) + "..."
                          : stepNames[i]}
                      </span>
                      <span className="hidden lg:inline">{stepNames[i]}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current step display - Responsive */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100 max-w-full">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="text-amber-900 font-bold text-sm sm:text-base lg:text-lg truncate">
              {stepNames[currentStep - 1]}
            </span>
            <div className="text-amber-700 text-xs sm:text-sm font-semibold bg-amber-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
              {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
