// import React, { useState } from "react";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { createBooking } from "../../API/Api";
// import { toast } from "react-toastify";

// export const BookingConfirmation = ({ bookingData, onPrev, onNext }) => {
//   const [loading, setLoading] = useState(false);

//   const handleConfirm = async () => {
//     setLoading(true);
//     try {
//       const response = await createBooking({
//         roomId: bookingData.selectedRoom._id,
//         checkIn: bookingData.checkIn,
//         checkOut: bookingData.checkOut,
//         guests: bookingData.adults + bookingData.children,
//         guestDetails: bookingData.guestDetails,
//         totalPrice: bookingData.selectedRoom.price, // optionally calculate nights * price
//       });

//       toast.success("Booking successful!  " + response._id);

//       // Move to next step (Payment or Receipt)
//       onNext();
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Confirm Your Booking
//         </h2>
//         <p className="text-gray-600">
//           Review your booking details before confirming
//         </p>
//       </div>

//       <div className="space-y-4">
//         <p>
//           <strong>Check-in:</strong> {bookingData.checkIn}
//         </p>
//         <p>
//           <strong>Check-out:</strong> {bookingData.checkOut}
//         </p>
//         <p>
//           <strong>Guests:</strong> {bookingData.adults} Adults,{" "}
//           {bookingData.children} Children
//         </p>
//         <p>
//           <strong>Room:</strong> {bookingData.selectedRoom.name}
//         </p>
//         <p>
//           <strong>Price per night:</strong> R{bookingData.selectedRoom.price}
//         </p>
//         <p>
//           <strong>Guest:</strong> {bookingData.guestDetails.firstName}{" "}
//           {bookingData.guestDetails.lastName}
//         </p>
//         <p>
//           <strong>Email:</strong> {bookingData.guestDetails.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {bookingData.guestDetails.phone}
//         </p>
//       </div>

//       <div className="mt-8 flex justify-between">
//         <button
//           onClick={onPrev}
//           className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center"
//         >
//           <ArrowLeft className="mr-2 w-4 h-4" />
//           Back
//         </button>
//         <button
//           onClick={handleConfirm}
//           disabled={loading}
//           className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 flex items-center"
//         >
//           {loading ? (
//             <Loader2 className="animate-spin w-4 h-4 mr-2" />
//           ) : (
//             "Confirm Booking & Proceed"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export const BookingConfirmation = ({ bookingData, onPrev, onNext }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      // Simulate a successful booking
      toast.success("Booking confirmed for " + bookingData.selectedRoom.name);

      // Move to next step (Payment or Receipt)
      onNext();
      setLoading(false);
    }, 500); // simulate delay
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-gray-600">
          Review your booking details before confirming
        </p>
      </div>

      <div className="space-y-4">
        <p>
          <strong>Check-in:</strong> {bookingData.checkIn}
        </p>
        <p>
          <strong>Check-out:</strong> {bookingData.checkOut}
        </p>
        <p>
          <strong>Guests:</strong> {bookingData.adults} Adults,{" "}
          {bookingData.children} Children
        </p>
        <p>
          <strong>Room:</strong> {bookingData.selectedRoom.name}
        </p>
        <p>
          <strong>Price per night:</strong> R{bookingData.selectedRoom.price}
        </p>
        <p>
          <strong>Guest:</strong> {bookingData.guestDetails.firstName}{" "}
          {bookingData.guestDetails.lastName}
        </p>
        <p>
          <strong>Email:</strong> {bookingData.guestDetails.email}
        </p>
        <p>
          <strong>Phone:</strong> {bookingData.guestDetails.phone}
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 flex items-center"
        >
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
          ) : (
            "Confirm Booking & Proceed"
          )}
        </button>
      </div>
    </div>
  );
};
