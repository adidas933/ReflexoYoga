import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  addVacation,
  deleteVacation,
  editVacation,
  initUser,
  initVacations,
  logoutUser,
} from './reducers';
import { VacationModel } from '../Models/VacationModel';
import { UserModel } from '../Models/UserModel';

// Application state:
export type AppState = {
  vacations: VacationModel[]; // Start with empty array rather than null
  user: UserModel;
};

// Vacation slice:
const vacationSlice = createSlice({
  name: 'vacations',
  initialState: [] as VacationModel[], // Empty array as default state
  reducers: {
    initVacations,
    addVacation,
    deleteVacation,
    editVacation
  },
});

// User slice:
const userSlice = createSlice({
  name: 'user',
  initialState: null, // Default state: null
  reducers: { initUser, logoutUser },
});

// Creating action creators:
export const vacationActions = vacationSlice.actions;
export const userActions = userSlice.actions;

// Main redux store:
export const store = configureStore<AppState>({
  reducer: {
    vacations: vacationSlice.reducer, // Vacation state
    user: userSlice.reducer, // User state
  },
});

// Export the RootState type inferred from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
