import { Action, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../Models/UserModel';


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
