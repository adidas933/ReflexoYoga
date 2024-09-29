import { Action, PayloadAction } from '@reduxjs/toolkit';
import { VacationModel } from '../Models/VacationModel';
import { UserModel } from '../Models/UserModel';

// Init(ialize) all vacations
export function initVacations(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
) {
  const newState: VacationModel[] = action.payload;
  console.log('Initializing Vacations with:', newState); // Log new state
  return newState; // action.payload is all products to init.
}

// Add vacation
export function addVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
) {
  return [...currentState, action.payload];

}

export function deleteVacation(
  currentState: VacationModel[],
  action: PayloadAction<string>
) {
  const vacationId = action.payload;
  const newState: VacationModel[] = currentState.filter(
    (vacation) => vacation._id !== vacationId
  );
  return newState;
}

export function editVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
) {
  const updatedVacation = action.payload; // Get the updated vacation from the action
  const newState: VacationModel[] = currentState.map((vacation) =>
    vacation._id === updatedVacation._id ? updatedVacation : vacation
  ); // Replace the old vacation with the updated one
  return newState; // Return the new state with the updated vacation
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
