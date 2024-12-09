import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  addBooking,
  deleteBooking,
  editBooking,
  initBookings,
  initInstructors,
  initUser,
  logoutUser,
} from './reducers';
import { UserModel } from '../Models/UserModel';
import { BookingModel } from '../Models/BookingModel';
import { InstructorModel } from '../Models/InstructorModel';

// Application state:
export type AppState = {
  bookings: BookingModel[]
  instructors: InstructorModel[]
  user: UserModel;
};

const instructorSlice = createSlice({
  name:'instructors',
  initialState:[] as InstructorModel[],
  reducers: {
    initInstructors
  }
})

// Booking slice:
const bookingSlice = createSlice({
  name: 'bookings',
  initialState: [] as BookingModel[],
  reducers: {
    initBookings,
    addBooking,
    deleteBooking,
    editBooking,
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
export const instructorActions = instructorSlice.actions;
export const bookingActions = bookingSlice.actions
// Main redux store:
export const store = configureStore<AppState>({
  reducer: {
    bookings: bookingSlice.reducer,
    user: userSlice.reducer, 
    instructors: instructorSlice.reducer, 
  },
});

// Export the RootState type inferred from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
