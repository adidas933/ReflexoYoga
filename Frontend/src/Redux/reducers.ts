import { Action, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../Models/UserModel';
import { BookingModel } from '../Models/BookingModel';
import { InstructorModel } from '../Models/InstructorModel';
import { ServiceModel } from '../Models/ServiceModel';
// Instructors
export function initInstructors(
  currentState: InstructorModel[],
  action: PayloadAction<InstructorModel[]>
) {
  const newState: InstructorModel[] = action.payload;
  console.log('Initializing instructors with: ', newState);
  return newState;
}

export function getInstructorById(
  currentState: InstructorModel[],
  action: PayloadAction<string>
): InstructorModel | undefined {
  const instructorId = action.payload;
  const instructor = currentState.find(
    (instructor) => instructor._id === instructorId
  );
  return instructor;
}

export function addInstructor(
  currentState: InstructorModel[],
  action: PayloadAction<InstructorModel>
) {
  return [...currentState, action.payload];
}

export function deleteInstructor(
  currentState: InstructorModel[],
  action: PayloadAction<string>
) {
  const instructorId = action.payload;
  const newState: InstructorModel[] = currentState.filter(
    (booking) => booking._id !== instructorId
  );
  return newState;
}

export function editInstructor(
  currentState: InstructorModel[],
  action: PayloadAction<InstructorModel>
) {
  const updatedInstructor = action.payload;
  const newState: InstructorModel[] = currentState.map((instructor) =>
    instructor._id === updatedInstructor._id ? updatedInstructor : instructor
  );
  return newState;
}

// Bookings
export function initBookings(
  currentState: BookingModel[],
  action: PayloadAction<BookingModel[]>
) {
  const newState: BookingModel[] = action.payload;
  console.log('Initializing bookings with: ', newState);
  return newState;
}

export function getBookingById(
  currentState: BookingModel[],
  action: PayloadAction<string>
): BookingModel | undefined {
  const bookingId = action.payload;
  const booking = currentState.find((booking) => booking._id === bookingId);
  return booking;
}

export function deleteBooking(
  currentState: BookingModel[],
  action: PayloadAction<string>
) {
  const bookingId = action.payload;
  const newState: BookingModel[] = currentState.filter(
    (booking) => booking._id !== bookingId
  );
  return newState;
}

export function editBooking(
  currentState: BookingModel[],
  action: PayloadAction<BookingModel>
) {
  const updatedBooking = action.payload;
  const newState: BookingModel[] = currentState.map((booking) =>
    booking._id === updatedBooking._id ? updatedBooking : booking
  );
  return newState;
}

// Services

export function initServices(
  currentState: ServiceModel[],
  action: PayloadAction<ServiceModel[]>
) {
  const newState: ServiceModel[] = action.payload;
  console.log('Initializing services with: ', newState);
  return newState;
}

export function getServiceById(
  currentState: ServiceModel[],
  action: PayloadAction<string>
): ServiceModel | undefined {
  const serviceId = action.payload;
  const service = currentState.find((service) => service._id === serviceId);
  return service;
}

export function addService(
  currentState: ServiceModel[],
  action: PayloadAction<ServiceModel>
) {
  return [...currentState, action.payload];
}

export function deleteService(
  currentState: ServiceModel[],
  action: PayloadAction<string>
) {
  const serviceId = action.payload;
  const newState: ServiceModel[] = currentState.filter(
    (booking) => booking._id !== serviceId
  );
  return newState;
}

export function editService(
  currentState: ServiceModel[],
  action: PayloadAction<ServiceModel>
) {
  const updatedService = action.payload;
  const newState: ServiceModel[] = currentState.map((service) =>
    service._id === updatedService._id ? updatedService : service
  );
  return newState;
}

// Users

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
