import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "../slices/notification/notificationSlice";

export const store = configureStore({
  reducer: {
     notificationsData: notificationSlice.reducer,
  },
});