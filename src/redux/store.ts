import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './slices/DarkModeSlice.ts';  // с большой буквы
import dataSlice from './slices/FetchDogsSlice.ts';

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        data: dataSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
