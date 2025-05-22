import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  setVehicleType,
  setServiceType,
  setStation,
  setTimeSlot,
  setViewMode,
  showConfirmationDialog,
  hideConfirmationDialog,
  resetBooking,
  fetchStations,
  submitBooking,
} from "../app/rootReducer";
// Dummy icon replacements
const Star = ({ filled }) => (
  <span style={{ color: filled ? "#facc15" : "#d1d5db" }}>★</span>
);
const Clock = () => <span role="img" aria-label="clock">🕒</span>;
const MapPin = () => <span role="img" aria-label="pin">📍</span>;
const Phone = () => <span role="img" aria-label="phone">📞</span>;
const Calendar = () => <span role="img" aria-label="calendar">📅</span>;
const CheckCircle = () => <span role="img" aria-label="check">✅</span>;

// Simple badge
const Badge = ({ children }) => (
  <span style={{
    display: "inline-block",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "12px",
    marginRight: "4px",
    marginBottom: "4px"
  }}>{children}</span>
);

const Separator = () => (
  <hr style={{ margin: "16px 0", borderColor: "#e5e7eb" }} />
);

const StationDetail = ({
  station = {
    id: "station-1",
    name: "AutoFix Express",
    address: "123 Repair Street, Mechanic City",
    phone: "+1 (555) 123-4567",
    rating: 4.5,
    distance: "2.3 km",
    eta: "15 min",
    services: [
      { id: "s1", name: "Oil Change", duration: "30 min", price: 49.99 },
      { id: "s2", name: "Tire Rotation", duration: "45 min", price: 29.99 },
      { id: "s3", name: "Brake Inspection", duration: "60 min", price: 39.99 },
    ],
    timeSlots: [
      [
        { id: "ts1", time: "9:00 AM", available: true },
        { id: "ts2", time: "10:00 AM", available: true },
        { id: "ts3", time: "11:00 AM", available: false },
        { id: "ts4", time: "12:00 PM", available: true },
      ],
      [
        { id: "ts5", time: "1:00 PM", available: false },
        { id: "ts6", time: "2:00 PM", available: true },
        { id: "ts7", time: "3:00 PM", available: true },
        { id: "ts8", time: "4:00 PM", available: false },
      ],
    ],
  },
  isExpanded = true,
}) => {
  
  const dispatch = useDispatch();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotSelect = (timeSlotId) => {
    setSelectedTimeSlot(timeSlotId);
        dispatch(setTimeSlot(timeSlotId));
    console.log(timeSlotId)
  };
  const handleBookNow = () => {
    dispatch(showConfirmationDialog());
  };

  // Generate star rating display
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} filled={true} />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half-star" filled={true} />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} filled={false} />);
    }
    return (
      <span>
        {stars} <span style={{ fontSize: "12px", marginLeft: "4px" }}>{rating.toFixed(1)}</span>
      </span>
    );
  };

  if (!isExpanded) {
    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", marginBottom: "16px", background: "#fff" }}>
        <div style={{ marginBottom: "8px", fontWeight: "bold", fontSize: "18px" }}>{station.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>{renderRating(station.rating)}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            <MapPin /> {station.distance} &nbsp; <Clock /> {station.eta}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-5 bg-white max-w-[600px] mx-auto dark:bg-black dark:text-white">
      <div className="flex justify-between">
        <div>
          <div className="font-bold text-[22px]">{station.name}</div>
          <div className="text-[14px] text-[#6b7280] mt-1">
            {/* <MapPin />  */}
            {station.address}
          </div>
        </div>
        <div className="text-right" >
          <div>{renderRating(station.rating)}</div>
          <div className="text-[12px] text-[#6b7280] mt-1">
            {/* <MapPin />  */}
            {station.distance} &nbsp;
             {/* <Clock /> */}
              {station.eta}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="font-bold text-[14px]">Contact Information</div>
        <div className="text-[14px] text-[#4b5563] mt-1">
          {/* <Phone /> */}
           {station.phone}
        </div>
      </div>

      <Separator />

      <div>
        <div className="font-bold text-[14px]">Services Available</div>
        <div  className="mt-2">
          {station.services.map((service) => (
            <Badge key={service.id}>
              {service.name} <span className="text-[#6b7280]">({service.duration})</span>
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center mb-2">
           {/* <Calendar /> */}
           <span className="font-bold text-[14px] ml-2">Available Time Slots</span>
        </div>
        {station.timeSlots.map((daySlots, dayIndex) => (
          <div key={`day-${dayIndex}`} className="flex gap-2 mb-2">
            {daySlots.map((slot) => (
              <button
                key={slot.id}
                className="px-3 py-1 rounded border flex items-center"
                style={{
                  background: selectedTimeSlot === slot.id ? "#facc15" : "#fff",
                  color: !slot.available ? "#9ca3af" : "#111827",
                  opacity: !slot.available ? 0.5 : 1,
                  cursor: !slot.available ? "not-allowed" : "pointer",
                }}
                disabled={!slot.available}
                onClick={() => handleTimeSlotSelect(slot.id)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button
        className="w-full p-2 text-white rounded font-bold"
          style={{
            background: selectedTimeSlot ? "#2563eb" : "#d1d5db",
            cursor: selectedTimeSlot ? "pointer" : "not-allowed"
          }}
          disabled={!selectedTimeSlot}
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default StationDetail;