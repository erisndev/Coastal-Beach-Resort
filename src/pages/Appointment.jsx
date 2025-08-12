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
    "/dine.jpg",
    "/dining.jpg",
    "/pool.jpg",
    "/sunset.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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

// Main Appointment Component
export const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState({
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
      specialRequests: "",
    },
    paymentDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  });

  // Mock room data
  const allRooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      price: 250,
      capacity: 2,
      amenities: ["Ocean View", "King Bed", "Balcony", "Mini Bar"],
      image: "🏖️",
      available: true,
    },
    {
      id: 2,
      name: "Garden Villa",
      price: 180,
      capacity: 4,
      amenities: ["Garden View", "Two Beds", "Kitchenette", "Patio"],
      image: "🌺",
      available: true,
    },
    {
      id: 3,
      name: "Deluxe Family Room",
      price: 320,
      capacity: 6,
      amenities: ["Two Bedrooms", "Living Area", "Kitchen", "Sea View"],
      image: "🏠",
      available: true,
    },
    {
      id: 4,
      name: "Standard Room",
      price: 120,
      capacity: 2,
      amenities: ["Queen Bed", "City View", "WiFi", "AC"],
      image: "🛏️",
      available: true,
    },
  ];
  const [rooms, setRooms] = useState(allRooms);

  // Utility functions
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
    const roomTotal = bookingData.selectedRoom.price * nights;
    return roomTotal;
  };

  // Navigation functions
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const startOver = () => {
    setCurrentStep(1);
    setBookingData({
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
        specialRequests: "",
      },
      paymentDetails: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: "",
      },
    });
  };

  // Component mapping
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
            allRooms={allRooms}
            setRooms={setRooms} // and setRooms if needed
          />
        );
      case 2:
        return (
          <RoomSelection
            {...stepProps}
            rooms={rooms}
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
          />
        );
      case 5:
        return (
          <PaymentDetails {...stepProps} calculateTotal={calculateTotal} />
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
    <div className="min-h-screen">
      <div className="relative z-10 py-8 px-4 overflow-hidden w-full mx-auto">
        <BackgroundCarousel />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Book Your Perfect Stay
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Experience luxury and comfort like never before
            </p>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={6} />

          {/* Main content with fade animation */}
          <div className="transition-all duration-500 ease-in-out transform">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
