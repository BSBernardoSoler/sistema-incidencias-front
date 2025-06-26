// store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../store/alertsSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
