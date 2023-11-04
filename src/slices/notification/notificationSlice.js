import { createSlice } from '@reduxjs/toolkit';

const InitialNotiState = {
    isLoading: false,
    clientConnect: 0,
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

      clienteConectados: (state, action) => {
        state.clientConnect = action.payload.clientConnect
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
    listarNotification,
    clienteConectados
 } = notificationSlice.actions;