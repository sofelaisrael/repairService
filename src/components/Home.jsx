import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingForm from "./BookingForm";
import StationFinder from "./StationFinder";
import BookingConfirmation from "./BookingConfirmation";
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

const Home = () => {
  const dispatch = useDispatch();
  const {
    selectedVehicle,
    selectedService,
    selectedStation,
    selectedTimeSlot,
    viewMode,
    showConfirmation,
    bookingStatus,
    stationsLoading,
  } = useSelector((state) => state.booking);

  useEffect(() => {
    if (selectedService) {
      dispatch(fetchStations());
      console.log(selectedService)
    }
  }, [selectedService, dispatch]);

  const handleVehicleSelect = (vehicle) => {
    dispatch(setVehicleType(vehicle));
  };

  const handleServiceSelect = (service) => {
    dispatch(setServiceType(service));
  };

  const handleStationSelect = (station) => {
    dispatch(setStation(station));
  };

  const handleTimeSlotSelect = (timeSlot) => {
    dispatch(setTimeSlot(timeSlot));
  };

  const handleBookNow = () => {
    dispatch(showConfirmationDialog());
  };

  const handleConfirmBooking = () => {
    dispatch(submitBooking())
      .unwrap()
      .then(() => {
        setTimeout(() => {
          dispatch(resetBooking());
        }, 2000);
      })
      .catch(() => {});
  };

  const handleCancelBooking = () => {
    dispatch(hideConfirmationDialog());
  };

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-[#0a0a0a] p-6" >

      <main style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <BookingForm
            onServiceSelected={(vehicle, service) => {
              handleVehicleSelect(vehicle);
              handleServiceSelect(service);
            }}
          />
        </div>

        {selectedService && (
          <div style={{ marginBottom: 32 }}>
            <StationFinder
              vehicleType={selectedVehicle || ""}
              serviceType={selectedService || ""}
              onStationSelect={handleStationSelect}
              onBookNow={handleBookNow}
            />
          </div>
        )}
      </main>

      <BookingConfirmation
        isOpen={showConfirmation}
        onClose={handleCancelBooking}
        onConfirm={handleConfirmBooking}
        bookingDetails={{
          vehicleType: selectedVehicle || "",
          service: selectedService || "",
          stationName: selectedStation?.name || "",
          address: selectedStation?.address || "",
          date: new Date().toISOString().split("T")[0],
          time: selectedTimeSlot
            ? selectedStation?.timeSlots
                ?.flat()
                ?.find((slot) => slot.id === selectedTimeSlot)?.time
            : "",
        }}
      />
    </div>
  );
};

export default Home;