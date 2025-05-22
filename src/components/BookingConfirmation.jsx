import React, { useState } from "react";

// Dummy icon replacements
const Loader = () => (
  <span role="img" aria-label="loading" style={{ fontSize: 48, animation: "spin 1s linear infinite" }}>⏳</span>
);
const CheckCircle = () => (
  <span role="img" aria-label="success" style={{ fontSize: 48, color: "#22c55e" }}>✅</span>
);
const AlertCircle = () => (
  <span role="img" aria-label="error" style={{ fontSize: 48, color: "#ef4444" }}>❌</span>
);

const BookingConfirmation = ({
  isOpen = true,
  onClose = () => {},
  onConfirm = () => {},
  bookingDetails = {
    vehicleType: "Sedan",
    service: "Oil Change",
    stationName: "AutoFix Center",
    address: "123 Main Street, City",
    date: "2023-06-15",
    time: "10:00 AM",
  },
}) => {
  const [status, setStatus] = useState("idle");

  const handleConfirm = () => {
    setStatus("loading");
    setTimeout(() => {
      if (Math.random() > 0.1) {
        setStatus("success");
        setTimeout(() => {
          onConfirm();
        }, 2000);
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  const handleEdit = () => {
    setStatus("idle");
    handleClose()
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isOpen) return null;

  console.log(bookingDetails)

  return (
    <div className="fixed top-1/2 right-[20%] -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] z-50 flex items-center justify-center">
      <div className="bg-white rounded max-w-[400px] w-full p-6 shadow relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-[20px] cursor-pointer"
          aria-label="Close"
        >×</button>

        {status === "idle" && (
          <>
            <h2 className="text-[32px] font-bold mb-1">Confirm Your Booking</h2>
            <p className="text-[#6b7280]">
              Please review your booking details before confirming.
            </p>
            <div className="bg-[#f1f1f1] dark:bg-[#0a0a0a] rounded dark:text-white p-4 mb-4">
              <div className="mb-2">
                <strong>Vehicle Type:</strong> {bookingDetails.vehicleType}
              </div>
              <div className="mb-2">
                <strong>Service:</strong> {bookingDetails.service}
              </div>
              <div className="mb-2">
                <strong>Station:</strong> {bookingDetails.stationName}
              </div>
              <div className="mb-2">
                <strong>Address:</strong> {bookingDetails.address}
              </div>
              <div className="mb-2">
                <strong>Date:</strong> {formatDate(bookingDetails.date)}
              </div>
              <div>
                <strong>Time:</strong> {bookingDetails.time}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleEdit}
                className="flex-1 py-2 border rounded bg-white cursor-pointer"
              >
                Edit Selection
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 rounded bg-[#2563eb] text-white font-bold cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}

        {status === "loading" && (
          <div className="py-10 text-center">
            <Loader />
            <p className="mt-4 text-[18px]">
              Processing your booking...
            </p>
            <p className="text-[#6b7280] mt-2">
              This will only take a moment.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="py-10 text-center">
            <CheckCircle />
            <p className="mt-4 text-[20px]">Booking Confirmed!</p>
            <p className="text-[#6b7280] mt-2">
              Your appointment has been scheduled successfully. A confirmation has been sent to your email.
            </p>
          </div>
        )}

        {status === "error" && (
          <>
            <div className="py-8 text-center">
              <AlertCircle />
              <p className="mt-4 text-[20px]">Booking Failed</p>
              <p className="text-[#6b7280] mt-2">
                We couldn't process your booking at this time. Please try again.
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleClose}
                className="flex-1 py-2 border rounded bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 border rounded bg-white cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;