import { Action,  PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../Models/UserModel';
import { BookingModel } from '../Models/BookingModel';
import { InstructorModel } from '../Models/InstructorModel';


export function initBookings(currentState:BookingModel[], action: PayloadAction<BookingModel[]>) {
  const newState: BookingModel[] = action.payload
  console.log('Initializing bookings with: ', newState);
  return newState
}
export function initInstructors(currentState:InstructorModel[], action: PayloadAction<InstructorModel[]>) {
  const newState: InstructorModel[] = action.payload
  console.log('Initializing instructors with: ', newState);
  return newState
}

export function addBooking(currentState:BookingModel[],action:PayloadAction<BookingModel>) {
  return [...currentState, action.payload]
}

export function deleteBooking(currentState:BookingModel[],action:PayloadAction<string>) {
  const bookingId = action.payload
  const newState:BookingModel[] = currentState.filter((booking) => booking._id !== bookingId)
  return newState
}

export function editBooking(currentState:BookingModel[], action:PayloadAction<BookingModel>) {
  const updatedBooking = action.payload
  const newState:BookingModel[] = currentState.map((booking) => booking._id ===updatedBooking._id ? updatedBooking:booking)
  return newState
}

// Init user
export function initUser(
  currentState: UserModel = null,
  action: PayloadAction<UserModel>
) {
  return action.payload;
}

// Logout user
export function logoutUser(
  currentState: UserModel = null,
  action: Action
): UserModel | null {
  return null; // Clear the user state on logout.
}
