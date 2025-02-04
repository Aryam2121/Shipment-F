import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./shipmentSlice";

const store = configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
