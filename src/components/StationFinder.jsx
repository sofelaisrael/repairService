import React, { useState } from "react";
import StationDetail from "./StationDetail";
import { useSelector } from "react-redux";

// Dummy icon replacements
const MapPin = () => (
  <span role="img" aria-label="pin">
    📍
  </span>
);
const ListIcon = () => (
  <span role="img" aria-label="list">
    📋
  </span>
);
const FilterIcon = () => (
  <span role="img" aria-label="filter">
    ⚙️
  </span>
);
const SearchIcon = () => (
  <span role="img" aria-label="search">
    🔍
  </span>
);
const Loader = () => (
  <span
    role="img"
    aria-label="loading"
    style={{ fontSize: 32, animation: "spin 1s linear infinite" }}
  >
    ⏳
  </span>
);

// Simple badge
const Badge = ({ children, style }) => (
  <span className="i border rounded px-2 py-1 text-[12px] mb-1 bg-[#f3f4f6] dark:bg-[#0a0a0a] dark:text-white dark:border-black" style={{...style}}>
    {children}
  </span>
);

const Separator = () => <hr className="my-3 border border-[#e5e7eb]" />;

const StationFinder = ({
  vehicleType = "Sedan",
  serviceType = "Oil Change",
  onStationSelect,
}) => {
  const [view, setView] = useState("list");
  // const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);

  const stations = useSelector((state) => state.booking.stations);
  const loading = useSelector((state) => state.booking.stationsLoading);

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const hasService = Array.isArray(station.services)
      ? station.services.some(
          (service) =>
            (typeof service === "string" && service === serviceType) ||
            (typeof service === "object" && service.name === serviceType)
        )
      : false;
    return matchesSearch && hasService;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStationClick = (station) => {
    console.log(station);
    setSelectedStation(station);
    console.log(station)
    if (onStationSelect) {
      onStationSelect(station);
    }
  };

  console.log(filteredStations);

  return (
    <div className="w-full bg-[#f1f1f1] dark:bg-black dark:text-white p-4 rounded shadow mx-auto max-w-[1200px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-bold">Available Repair Stations</h2>
          {/* <div>
            <button
              className={`mr-2 px-3 py-2 rounded cursor-pointer border ${
                view === "list"
                  ? "border-[#2563eb] bg-[#e0e7ff]"
                  : "border-[#d1d5db] bg-white"
              }`}
              onClick={() => setView("list")}
            >
              <ListIcon /> List
            </button>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border:
                  view === "map" ? "2px solid #2563eb" : "1px solid #d1d5db",
                background: view === "map" ? "#e0e7ff" : "#fff",
                cursor: "pointer",
              }}
              onClick={() => setView("map")}
            >
              <MapPin /> Map
            </button>
          </div> */}
        </div>
        {/* 
        <div className="flex flex-wrap gap-3  items-center">
          <div className="relative flex-1 min-w-[220px]">
            <span
              style={{
                position: "absolute",
                left: 10,
                top: 10,
                color: "#9ca3af",
              }}
            >
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search by name or location"
              style={{
                width: "100%",
                padding: "8px 8px 8px 32px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                fontSize: 14,
              }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
            onClick={() => alert("Filter options coming soon!")}
          >
            <FilterIcon /> Filter Options
          </button>
        </div> */}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge>{vehicleType}</Badge>
          <Badge>{serviceType}</Badge>
        </div>

        {view === "list" && (
          <div>
            {loading ? (
              <div className="flex flex-col items-center h-[200px] justify-center">
                <p className="mt-2 text-[#6b7280]">Finding stations...</p>
              </div>
            ) : filteredStations.length === 0 ? (
              <div className="flex flex-col items-center h-[200px] justify-center">
                <p className="mt-2 text-[#6b7280]">
                  No stations found matching your criteria.
                </p>
                <button
                  className="mt-4 px-4 py-2 border rounded dark:bg-white bg-black cursor-pointer dark:text-black"
                  onClick={() => setSearchQuery("")}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                }}
              >
                {filteredStations.map((station) => (
                  <div
                    key={station.id}
                    className="cursor-pointer rounded bg-white dark:bg-[#0a0a0a] shadow transition-shadow overflow-hidden"
                    onClick={() => handleStationClick(station)}
                  >
                    <div className="relative h-[50px] w-full">
                      <div className="absolute top-2 right-2 bg-white rounded text-[13px] shadow dark:bg-black">
                        <Badge>{station.rating} ★</Badge>
                      </div>
                    </div>
                    <div className="px-3">
                      <h3 className="font-bold text-[18px]">{station.name}</h3>
                      <p className="text-[#6b7280] text-[13px]">
                        {station.address}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-[13px]">{station.distance}</span>
                        <span className="text-[13px]">ETA: {station.eta}</span>
                      </div>
                      <Separator />
                      <div className="flex flex-wrap gap-1 mt-2">
                        {station.services.map((service, idx) => (
                          <Badge
                            key={idx}
                            style={
                              service.name === serviceType
                                ? { background: "gray" }
                                : {}
                            }
                          >
                            {service.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* {view === "map" && (
          <div
            style={{
              background: "#f3f4f6",
              height: 300,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <MapPin style={{ fontSize: 32 }} />
              <p style={{ marginTop: 8, color: "#6b7280" }}>
                Map view coming soon
              </p>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                Stations will be displayed on an interactive map
              </p>
            </div>
          </div>
        )} */}

        {selectedStation && (
          <div className="mt-6">
            <StationDetail
              station={selectedStation}
              serviceType={serviceType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StationFinder;
