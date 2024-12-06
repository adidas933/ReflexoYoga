import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  addBooking,
  deleteBooking,
  editBooking,
  initBookings,
  initUser,
  logoutUser,
} from './reducers';
import { UserModel } from '../Models/UserModel';
import { BookingModel } from '../Models/BookingModel';

// Application state:
export type AppState = {
  bookings: BookingModel[]
  user: UserModel;
};

// Vacation slice:
const bookingSlice = createSlice({
  name: 'bookings',
  initialState: [] as BookingModel[],
  reducers: {
    initBookings,
    addBooking,
    deleteBooking,
    editBooking
  }
})

// User slice:
const userSlice = createSlice({
  name: 'user',
  initialState: null, // Default state: null
  reducers: { initUser, logoutUser },
});

// Creating action creators:
export const userActions = userSlice.actions;
export const bookingActions = bookingSlice.actions
// Main redux store:
export const store = configureStore<AppState>({
  reducer: {
    bookings: bookingSlice.reducer,
    user: userSlice.reducer, // User state
  },
});

// Export the RootState type inferred from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
