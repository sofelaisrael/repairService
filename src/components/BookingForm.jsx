import { RxCaretDown } from "react-icons/rx"; 
import React, { useState } from "react";

const BookingForm = ({ onServiceSelected = () => {} }) => {
  const [vehicleType, setVehicleType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [error, setError] = useState("");
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  const vehicleTypes = [
    { id: "sedan", name: "Sedan" },
    { id: "suv", name: "SUV" },
    { id: "truck", name: "Truck" },
    { id: "van", name: "Van" },
    { id: "motorcycle", name: "Motorcycle" },
  ];

  const serviceTypes = [
    {
      id: "Oil Change",
      name: "Oil Change",
      description: "Regular maintenance service",
    },
    {
      id: "Tire Rotation",
      name: "Tire Rotation",
      description: "Extends tire life and improves handling",
    },
    {
      id: "Brake Service",
      name: "Brake Service",
      description: "Inspection and repair of brake system",
    },
    {
      id: "Engine Tune Up",
      name: "Engine Tune up",
      description: "Optimize engine performance",
    },
    {
      id: "Battery Replacement",
      name: "Battery Replacement",
      description: "Replace old or failing battery",
    },
  ];

  const handleSubmit = () => {
    if (!vehicleType) {
      setError("Please select a vehicle type");
      return;
    }
    if (!serviceType) {
      setError("Please select a service type");
      return;
    }
    setError("");
    onServiceSelected(vehicleType, serviceType);
  };

  return (
    <div className="w-full max-w-[600px] bg-white dark:bg-black dark:text-white mx-auto rounded-lg shadow p-6">
      <h2 className="text-[24px] font-bold text-center mb-6">
        Book Your Car Repair Service
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-[14px] flex items-center gap-2 mb-2">
            Vehicle Type
          </label>
          <div
            className="relative"
            tabIndex={0}
            onBlur={() => setTimeout(() => setVehicleDropdownOpen(false), 100)}
          >
            <div
              className="w-full px-3 py-2 border rounded cursor-pointer bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:text-white flex items-center justify-between"
              style={{
                border: "1px solid #d1d5db",
                fontSize: 14,
              }}
              onClick={() => setVehicleDropdownOpen((v) => !v)}
            >
              {vehicleType
                ? vehicleTypes.find((v) => v.id === vehicleType)?.name
                : "Select your vehicle type"}
                <RxCaretDown />
            </div>
            {vehicleDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border dark:border-neutral-700 rounded shadow z-10 max-h-48 overflow-auto">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer ${
                      vehicleType === vehicle.id
                        ? "bg-gray-200 dark:bg-neutral-700"
                        : ""
                    }`}
                    onMouseDown={() => {
                      setVehicleType(vehicle.id);
                      setServiceType("");
                      setVehicleDropdownOpen(false);
                    }}
                  >
                    {vehicle.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="text-[14px] flex items-center gap-2 mb-2">
            Service Type
          </label>
          <div
            className={`relative ${
              !vehicleType ? "pointer-events-none opacity-60 " : ""
            }`}
            tabIndex={0}
            onBlur={() => setTimeout(() => setServiceDropdownOpen(false), 100)}
          >
            <div
              className="w-full px-3 py-2 border rounded cursor-pointer bg-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700 flex items-center justify-between"
              style={{
                border: "1px solid #d1d5db",
                fontSize: 14,
              }}
              onClick={() => vehicleType && setServiceDropdownOpen((v) => !v)}
            >
              {serviceType
                ? serviceTypes.find((s) => s.id === serviceType)?.name
                : vehicleType
                ? "Select service type"
                : "Select vehicle type first"}
                <RxCaretDown />
            </div>
            {serviceDropdownOpen && vehicleType && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border dark:border-neutral-700 rounded shadow z-10 max-h-48 overflow-auto">
                {serviceTypes.map((service) => (
                  <div
                    key={service.id}
                    className={`px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer ${
                      serviceType === service.id
                        ? "bg-gray-200 dark:bg-neutral-700"
                        : ""
                    }`}
                    onMouseDown={() => {
                      setServiceType(service.id);
                      setServiceDropdownOpen(false);
                    }}
                  >
                    <span className="font-semibold">{service.name}</span>
                    <span className="ml-2 text-gray-500 text-xs">
                      {service.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
      {error && (
        <div className="flex items-center bg-[#fee2e2] text-[#b91c1c] rounded px-3 py-2 mb-4 text-[14px]">
          <span>{error}</span>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-black dark:bg-white dark:text-black text-white rounded text-[16px] cursor-pointer"
        >
          Find Available Stations
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
