import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../../api/FetchDogs';
import { Breed } from '../../api/api';

interface DataState {
    rows: Breed[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    rows: [],
    status: 'idle',
    error: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<Breed[]>) => {
                state.status = 'succeeded';
                state.rows = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
});

export default dataSlice.reducer;
