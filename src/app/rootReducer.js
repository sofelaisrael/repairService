import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  selectedVehicle: null,
  selectedService: null,
  selectedStation: null,
  selectedTimeSlot: null,
  viewMode: "list",
  showConfirmation: false,
  bookingStatus: "idle",
  stationsLoading: false,
  stations: [],
};

const mockStations = [
  {
    id: "1",
    name: "AutoFix Express",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    distance: "1.2 km",
    eta: "5 mins",
    rating: 4.8,
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
    image:
      "https://images.unsplash.com/photo-1613214150384-4fbc6d470d8d?w=800&q=80",
  },
  {
    id: "2",
    name: "Quick Repair Center",
    address: "456 Oak Avenue, Westside",
    phone: "+1 (555) 987-6543",
    distance: "2.5 km",
    eta: "10 mins",
    rating: 4.5,
    services: [
      { id: "s1", name: "Oil Change", duration: "30 min", price: 49.99 },
      {
        id: "s4",
        name: "Engine Diagnostics",
        duration: "60 min",
        price: 79.99,
      },
      {
        id: "s5",
        name: "Battery Replacement",
        duration: "45 min",
        price: 129.99,
      },
    ],
    timeSlots: [
      [
        { id: "ts9", time: "9:00 AM", available: false },
        { id: "ts10", time: "10:00 AM", available: true },
        { id: "ts11", time: "11:00 AM", available: true },
        { id: "ts12", time: "12:00 PM", available: false },
      ],
      [
        { id: "ts13", time: "1:00 PM", available: true },
        { id: "ts14", time: "2:00 PM", available: false },
        { id: "ts15", time: "3:00 PM", available: true },
        { id: "ts16", time: "4:00 PM", available: true },
      ],
    ],
    image:
      "https://images.unsplash.com/photo-1597762117709-859f744b84c3?w=800&q=80",
  },
  {
    id: "3",
    name: "Premium Auto Service",
    address: "789 Pine Road, Eastside",
    phone: "+1 (555) 456-7890",
    distance: "3.8 km",
    eta: "15 mins",
    rating: 4.9,
    services: [
      { id: "s1", name: "Oil Change", duration: "30 min", price: 59.99 },
      { id: "s6", name: "AC Service", duration: "90 min", price: 149.99 },
      { id: "s7", name: "Wheel Alignment", duration: "60 min", price: 89.99 },
    ],
    timeSlots: [
      [
        { id: "ts17", time: "9:00 AM", available: true },
        { id: "ts18", time: "10:00 AM", available: false },
        { id: "ts19", time: "11:00 AM", available: true },
        { id: "ts20", time: "12:00 PM", available: true },
      ],
      [
        { id: "ts21", time: "1:00 PM", available: true },
        { id: "ts22", time: "2:00 PM", available: true },
        { id: "ts23", time: "3:00 PM", available: false },
        { id: "ts24", time: "4:00 PM", available: true },
      ],
    ],
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80",
  },
  // Add these inside your mockStations array in rootReducer.js

{
  id: "4",
  name: "City Garage",
  address: "101 City Plaza, Uptown",
  phone: "+1 (555) 222-3333",
  distance: "4.1 km",
  eta: "18 mins",
  rating: 4.2,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 45.99 },
    { id: "s8", name: "Transmission Repair", duration: "120 min", price: 299.99 },
    { id: "s9", name: "Tire Rotation", duration: "40 min", price: 25.99 },
  ],
  timeSlots: [
    [
      { id: "ts25", time: "9:30 AM", available: true },
      { id: "ts26", time: "10:30 AM", available: true },
      { id: "ts27", time: "11:30 AM", available: false },
      { id: "ts28", time: "12:30 PM", available: true },
    ],
    [
      { id: "ts29", time: "2:00 PM", available: true },
      { id: "ts30", time: "3:00 PM", available: false },
      { id: "ts31", time: "4:00 PM", available: true },
      { id: "ts32", time: "5:00 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
},
{
  id: "5",
  name: "Downtown Motors",
  address: "202 River Road, Downtown",
  phone: "+1 (555) 444-5555",
  distance: "2.9 km",
  eta: "12 mins",
  rating: 4.6,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 47.99 },
    { id: "s10", name: "Brake Service", duration: "60 min", price: 59.99 },
    { id: "s11", name: "Battery Replacement", duration: "50 min", price: 119.99 },
  ],
  timeSlots: [
    [
      { id: "ts33", time: "8:00 AM", available: true },
      { id: "ts34", time: "9:00 AM", available: true },
      { id: "ts35", time: "10:00 AM", available: false },
      { id: "ts36", time: "11:00 AM", available: true },
    ],
    [
      { id: "ts37", time: "1:00 PM", available: true },
      { id: "ts38", time: "2:00 PM", available: true },
      { id: "ts39", time: "3:00 PM", available: false },
      { id: "ts40", time: "4:00 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=800&q=80",
},
{
  id: "6",
  name: "Express Auto Care",
  address: "303 Elm Street, Midtown",
  phone: "+1 (555) 666-7777",
  distance: "3.3 km",
  eta: "14 mins",
  rating: 4.3,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 44.99 },
    { id: "s12", name: "AC Service", duration: "90 min", price: 139.99 },
    { id: "s13", name: "Wheel Alignment", duration: "60 min", price: 79.99 },
  ],
  timeSlots: [
    [
      { id: "ts41", time: "9:00 AM", available: true },
      { id: "ts42", time: "10:00 AM", available: true },
      { id: "ts43", time: "11:00 AM", available: false },
      { id: "ts44", time: "12:00 PM", available: true },
    ],
    [
      { id: "ts45", time: "1:00 PM", available: true },
      { id: "ts46", time: "2:00 PM", available: false },
      { id: "ts47", time: "3:00 PM", available: true },
      { id: "ts48", time: "4:00 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80",
},
{
  id: "7",
  name: "Greenlight Service Center",
  address: "404 Maple Avenue, Northside",
  phone: "+1 (555) 888-9999",
  distance: "5.0 km",
  eta: "20 mins",
  rating: 4.7,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 52.99 },
    { id: "s14", name: "Tire Rotation", duration: "45 min", price: 32.99 },
    { id: "s15", name: "Engine Diagnostics", duration: "70 min", price: 89.99 },
  ],
  timeSlots: [
    [
      { id: "ts49", time: "8:30 AM", available: true },
      { id: "ts50", time: "9:30 AM", available: true },
      { id: "ts51", time: "10:30 AM", available: false },
      { id: "ts52", time: "11:30 AM", available: true },
    ],
    [
      { id: "ts53", time: "1:30 PM", available: true },
      { id: "ts54", time: "2:30 PM", available: true },
      { id: "ts55", time: "3:30 PM", available: false },
      { id: "ts56", time: "4:30 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
},
{
  id: "8",
  name: "Metro Auto Solutions",
  address: "505 Oak Lane, Southside",
  phone: "+1 (555) 101-2020",
  distance: "6.2 km",
  eta: "25 mins",
  rating: 4.4,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 48.99 },
    { id: "s16", name: "Battery Replacement", duration: "50 min", price: 109.99 },
    { id: "s17", name: "Brake Service", duration: "60 min", price: 69.99 },
  ],
  timeSlots: [
    [
      { id: "ts57", time: "9:15 AM", available: true },
      { id: "ts58", time: "10:15 AM", available: true },
      { id: "ts59", time: "11:15 AM", available: false },
      { id: "ts60", time: "12:15 PM", available: true },
    ],
    [
      { id: "ts61", time: "1:15 PM", available: true },
      { id: "ts62", time: "2:15 PM", available: false },
      { id: "ts63", time: "3:15 PM", available: true },
      { id: "ts64", time: "4:15 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
},
{
  id: "9",
  name: "Urban Auto Clinic",
  address: "606 Cedar Street, Midtown",
  phone: "+1 (555) 303-4040",
  distance: "3.7 km",
  eta: "16 mins",
  rating: 4.1,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 46.99 },
    { id: "s18", name: "AC Service", duration: "90 min", price: 129.99 },
    { id: "s19", name: "Wheel Alignment", duration: "60 min", price: 84.99 },
  ],
  timeSlots: [
    [
      { id: "ts65", time: "8:45 AM", available: true },
      { id: "ts66", time: "9:45 AM", available: true },
      { id: "ts67", time: "10:45 AM", available: false },
      { id: "ts68", time: "11:45 AM", available: true },
    ],
    [
      { id: "ts69", time: "12:45 PM", available: true },
      { id: "ts70", time: "1:45 PM", available: false },
      { id: "ts71", time: "2:45 PM", available: true },
      { id: "ts72", time: "3:45 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=800&q=80",
},
{
  id: "10",
  name: "AllStar Mechanics",
  address: "707 Birch Blvd, Westside",
  phone: "+1 (555) 505-6060",
  distance: "7.5 km",
  eta: "30 mins",
  rating: 4.0,
  services: [
    { id: "s1", name: "Oil Change", duration: "30 min", price: 50.99 },
    { id: "s20", name: "Transmission Repair", duration: "120 min", price: 319.99 },
    { id: "s21", name: "Engine Diagnostics", duration: "70 min", price: 95.99 },
  ],
  timeSlots: [
    [
      { id: "ts73", time: "9:00 AM", available: true },
      { id: "ts74", time: "10:00 AM", available: true },
      { id: "ts75", time: "11:00 AM", available: false },
      { id: "ts76", time: "12:00 PM", available: true },
    ],
    [
      { id: "ts77", time: "1:00 PM", available: true },
      { id: "ts78", time: "2:00 PM", available: false },
      { id: "ts79", time: "3:00 PM", available: true },
      { id: "ts80", time: "4:00 PM", available: true },
    ],
  ],
  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
},
];

// Async thunks
export const fetchStations = createAsyncThunk(
  "booking/fetchStations",
  async (_, { getState }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockStations;
  },
);

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (_, { getState }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return { success: true };
    } else {
      throw new Error("Booking failed");
    }
  },
);


const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVehicleType: (state, action) => {
      state.selectedVehicle = action.payload;
      state.selectedService = null;
    },
    setServiceType: (state, action) => {
      state.selectedService = action.payload;
    },
    setStation: (state, action) => {
      state.selectedStation = action.payload;
    },
    setTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    showConfirmationDialog: (state) => {
      state.showConfirmation = true;
    },
    hideConfirmationDialog: (state) => {
      state.showConfirmation = false;
    },
    resetBooking: (state) => {
      state.selectedVehicle = null;
      state.selectedService = null;
      state.selectedStation = null;
      state.selectedTimeSlot = null;
      state.showConfirmation = false;
      state.bookingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStations
      .addCase(fetchStations.pending, (state) => {
        state.stationsLoading = true;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.stationsLoading = false;
        state.stations = action.payload;
      })
      .addCase(fetchStations.rejected, (state) => {
        state.stationsLoading = false;
      })
      // Handle submitBooking
      .addCase(submitBooking.pending, (state) => {
        state.bookingStatus = "loading";
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.bookingStatus = "success";
      })
      .addCase(submitBooking.rejected, (state) => {
        state.bookingStatus = "error";
      });
  },
});

export const {
  setVehicleType,
  setServiceType,
  setStation,
  setTimeSlot,
  setViewMode,
  showConfirmationDialog,
  hideConfirmationDialog,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;