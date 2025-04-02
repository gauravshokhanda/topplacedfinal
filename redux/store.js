import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
// Placeholder for reducers (we'll add them later)
const rootReducer = {
    form: formReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});