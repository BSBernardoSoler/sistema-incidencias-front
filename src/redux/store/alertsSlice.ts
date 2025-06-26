// store/alertSlice.ts
import { Alerta } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface AlertState {
  items: Alerta[];
}

const initialState: AlertState = {
  items: []
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlerts(state, action: PayloadAction<Alerta[]>) {
      state.items = action.payload;
    },
    addAlert(state, action: PayloadAction<Alerta>) {
      state.items.unshift(action.payload); // último arriba
    },
    updateAlert(state, action: PayloadAction<Alerta>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
    removeAlert(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== Number(action.payload));
    }
  }
});

export const { setAlerts, addAlert, updateAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
