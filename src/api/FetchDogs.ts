import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { Breed } from './api';



export const fetchData = createAsyncThunk<Breed[], void, { rejectValue: string }>(
    'data/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<Breed[]>('/');
            return response.data;
        } catch (error) {
            console.log('Error fetching data:', error);
            return rejectWithValue('Failed to fetch data');
        }
    }
);