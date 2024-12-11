// thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServiceModel } from '../Models/ServiceModel';
import { serviceActions } from './store';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get<ServiceModel[]>('/api/services');
      dispatch(serviceActions.initServices(response.data));
    } catch (error) {
      console.error('Failed to fetch services:', error); // Log the exact error
      throw error; // Re-throw for global error handling
    }
  }
);
