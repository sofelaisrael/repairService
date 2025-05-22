import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./rootReducer";

const store = configureStore({
  reducer: {
    booking: bookingReducer, // <-- this creates state.booking
  },
});

export default store;