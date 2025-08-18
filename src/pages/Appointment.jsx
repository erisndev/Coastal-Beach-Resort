// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";

// import { DateGuestSelection } from "@/components/appointment-form/DateGuestSelection";
// import { RoomSelection } from "@/components/appointment-form/RoomSelection";
// import { GuestDetails } from "@/components/appointment-form/GuestDetails";
// import { BookingConfirmation } from "@/components/appointment-form/BookingConfirmation";
// import { PaymentDetails } from "@/components/appointment-form/PaymentDetails";
// import { BookingReceipt } from "@/components/appointment-form/BookingReceipt";
// import { ProgressBar } from "@/components/appointment-form/ProgressBar";

// // Background carousel component
// const BackgroundCarousel = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const backgroundImages = [
//     "/hero-img.jpg",
//     "/house.jpg",
//     "/pool.jpg",
//     "/sunset.jpg",
//     "/bar.jpeg",
//     "/contact-1.jpg",
//     "/contact.jpg",
//     "/pool1.jpg",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute inset-0 -z-10">
//       {backgroundImages.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
//             index === currentImageIndex ? "opacity-100" : "opacity-0"
//           }`}
//           style={{
//             backgroundImage: `url(${image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/40"></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export const Appointment = () => {
//   const defaultBookingData = {
//     checkIn: "",
//     checkOut: "",
//     adults: 1,
//     children: 0,
//     selectedRoom: null,
//     guestDetails: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       specialRequests: "",
//     },
//     paymentDetails: {
//       cardNumber: "",
//       expiryDate: "",
//       cvv: "",
//       cardName: "",
//     },
//   };

//   // Load from localStorage if available
//   const [bookingData, setBookingData] = useState(() => {
//     const saved = localStorage.getItem("bookingData");
//     return saved ? JSON.parse(saved) : defaultBookingData;
//   });

//   const [currentStep, setCurrentStep] = useState(() => {
//     const saved = localStorage.getItem("currentStep");
//     return saved ? Number(saved) : 1;
//   });

//   const [rooms, setRooms] = useState([]);

//   // Save to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("bookingData", JSON.stringify(bookingData));
//   }, [bookingData]);

//   useEffect(() => {
//     localStorage.setItem("currentStep", currentStep);
//   }, [currentStep]);

//   const calculateNights = () => {
//     if (!bookingData.checkIn || !bookingData.checkOut) return 0;
//     const checkIn = new Date(bookingData.checkIn);
//     const checkOut = new Date(bookingData.checkOut);
//     const diffTime = Math.abs(checkOut - checkIn);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const calculateTotal = () => {
//     if (!bookingData.selectedRoom) return 0;
//     const nights = calculateNights();
//     return bookingData.selectedRoom.price * nights;
//   };

//   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
//   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

//   const startOver = () => {
//     setCurrentStep(1);
//     setBookingData(defaultBookingData);
//     localStorage.removeItem("bookingData");
//     localStorage.removeItem("currentStep");
//   };

//   const renderCurrentStep = () => {
//     const stepProps = {
//       bookingData,
//       setBookingData,
//       onNext: nextStep,
//       onPrev: prevStep,
//     };

//     switch (currentStep) {
//       case 1:
//         return (
//           <DateGuestSelection
//             {...stepProps}
//             rooms={rooms}
//             setRooms={setRooms}
//           />
//         );
//       case 2:
//         return (
//           <RoomSelection
//           {...stepProps}
//           rooms={rooms}
//           calculateNights={calculateNights}
//           />
//         );
//       case 3:
//         return <GuestDetails {...stepProps} />;
//       case 4:
//         return (
//           <BookingConfirmation
//             {...stepProps}
//             calculateNights={calculateNights}
//             calculateTotal={calculateTotal}
//           />
//         );
//       case 5:
//         return (
//           <PaymentDetails {...stepProps} calculateTotal={calculateTotal} />
//         );
//       case 6:
//         return (
//           <BookingReceipt
//             bookingData={bookingData}
//             onStartOver={startOver}
//             calculateTotal={calculateTotal}
//             calculateNights={calculateNights}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
//       <div className="relative z-10 min-h-screen flex flex-col">
//         <BackgroundCarousel />

//         <div className="flex-1 flex flex-col justify-center py-20 px-4">
//           {/* Hero Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
//               Book Your
//             </h1>
//             <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
//               Perfect Stay
//             </h1>
//             <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
//               Experience luxury and comfort like never before at our coastal
//               retreat
//             </p>
//             <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
//           </div>

//           {/* Progress Bar */}
//           <div className="opacity-0 animate-[fadeInUp_1.5s_ease-out_2.5s_forwards]">
//             <ProgressBar currentStep={currentStep} totalSteps={6} />
//           </div>

//           {/* Booking Form */}
//           <div className="opacity-0 animate-[fadeInUp_1.5s_ease-out_3s_forwards]">
//             <div className="transition-all duration-500 ease-in-out transform">
//               {renderCurrentStep()}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { DateGuestSelection } from "@/components/appointment-form/DateGuestSelection";
import { RoomSelection } from "@/components/appointment-form/RoomSelection";
import { GuestDetails } from "@/components/appointment-form/GuestDetails";
import { BookingConfirmation } from "@/components/appointment-form/BookingConfirmation";
import { PaymentDetails } from "@/components/appointment-form/PaymentDetails";
import { BookingReceipt } from "@/components/appointment-form/BookingReceipt";
import { ProgressBar } from "@/components/appointment-form/ProgressBar";

// Background carousel component
const BackgroundCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/hero-img.jpg",
    "/house.jpg",
    "/pool.jpg",
    "/sunset.jpg",
    "/bar.jpeg",
    "/contact-1.jpg",
    "/contact.jpg",
    "/pool1.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
    </div>
  );
};

export const Appointment = () => {
  const defaultBookingData = {
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    selectedRoom: null,
    guestDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      dateOfBirth: "",
      gender: "",
      specialRequests: "",
    },
    paymentDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  };

  const [bookingData, setBookingData] = useState(() => {
    const saved = localStorage.getItem("bookingData");
    return saved ? JSON.parse(saved) : defaultBookingData;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("currentStep");
    return saved ? Number(saved) : 1;
  });

  // Rooms found from availability search
  const [rooms, setRooms] = useState([]);
  const [availableUnits, setAvailableUnits] = useState([]);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!bookingData.selectedRoom) return 0;
    const nights = calculateNights();
    return bookingData.selectedRoom.price * nights;
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const startOver = () => {
    setCurrentStep(1);
    setBookingData(defaultBookingData);
    localStorage.removeItem("bookingData");
    localStorage.removeItem("currentStep");
  };

  const renderCurrentStep = () => {
    const stepProps = {
      bookingData,
      setBookingData,
      onNext: nextStep,
      onPrev: prevStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <DateGuestSelection
            {...stepProps}
            rooms={rooms}
            setRooms={setRooms}
            setAvailableUnits={setAvailableUnits}
          />
        );
      case 2:
        return (
          <RoomSelection
            {...stepProps}
            rooms={rooms}
            availableUnits={availableUnits}
            calculateNights={calculateNights}
          />
        );
      case 3:
        return <GuestDetails {...stepProps} />;
      case 4:
        return (
          <BookingConfirmation
            {...stepProps}
            calculateNights={calculateNights}
            calculateTotal={calculateTotal}
            setAvailableUnits={setAvailableUnits}
          />
        );
      case 5:
        return (
          <PaymentDetails
            {...stepProps}
            calculateTotal={calculateTotal}
            onPaymentSuccess={(transaction) => {
              console.log("Payment success:", transaction);
              nextStep(); // move to receipt page
            }}
          />
        );
      case 6:
        return (
          <BookingReceipt
            bookingData={bookingData}
            onStartOver={startOver}
            calculateTotal={calculateTotal}
            calculateNights={calculateNights}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      <div className="relative z-10 min-h-screen flex flex-col">
        <BackgroundCarousel />

        <div className="flex-1 flex flex-col justify-center py-20 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
              Book Your
            </h1>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
              Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
              Experience luxury and comfort like never before at our coastal
              retreat
            </p>
            <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
          </div>

          {/* Progress Bar */}
          <div className="opacity-0 animate-[fadeInUp_1.5s_ease-out_2.5s_forwards]">
            <ProgressBar currentStep={currentStep} totalSteps={6} />
          </div>

          {/* Booking Form */}
          <div className="opacity-0 animate-[fadeInUp_1.5s_ease-out_3s_forwards]">
            <div className="transition-all duration-500 ease-in-out transform">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
