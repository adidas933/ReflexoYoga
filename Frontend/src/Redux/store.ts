import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  initUser,
  logoutUser,
} from './reducers';
import { UserModel } from '../Models/UserModel';

// Application state:
export type AppState = {
  user: UserModel;
};

// Vacation slice:

// User slice:
const userSlice = createSlice({
  name: 'user',
  initialState: null, // Default state: null
  reducers: { initUser, logoutUser },
});

// Creating action creators:
export const userActions = userSlice.actions;

// Main redux store:
export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer, // User state
  },
});

// Export the RootState type inferred from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
