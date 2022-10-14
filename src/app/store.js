import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// THE GLOBAL SCOPE SETUP
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
