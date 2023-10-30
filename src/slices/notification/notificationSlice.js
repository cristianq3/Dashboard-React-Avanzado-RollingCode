import { createSlice } from '@reduxjs/toolkit';

const InitialNotiState = {
    isLoading: false,
    notification: []
  };

  export const notificationSlice = createSlice({
    name: 'notification',
    initialState: InitialNotiState,
    reducers: {
      setNotification: (state, action) => {
        state.isLoading = false;
        state.notification = action.payload.notification;
      },
      
      isLoadingNotification: (state) => {
        state.isLoading = true
      },

      listarNotification: (state, action) => {
        state.isLoading = false,
        state.notification = action.payload.notification
     },
    }
});

export const { 
    setNotification,
    isLoadingNotification,
    listarNotification
 } = notificationSlice.actions;