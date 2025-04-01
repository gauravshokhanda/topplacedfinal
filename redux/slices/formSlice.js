import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    data: {
      selectedDate: '26 Mar', // Default value from your form
      selectedTime: '10:00 AM', // Default value from your form
      field: '',
      name: '',
      email: '',
      whatsappNumber: '',
    },
  },
  reducers: {
    updateFormData: (state, action) => {
      state.data = { ...state.data, ...action.payload }; // Merge new data into existing state
    },
    resetFormData: (state) => {
      state.data = {
        selectedDate: '26 Mar',
        selectedTime: '10:00 AM',
        field: '',
        name: '',
        email: '',
        whatsappNumber: '',
      }; // Reset to initial values
    },
  },
});

// Export actions to use in components
export const { updateFormData, resetFormData } = formSlice.actions;

// Export reducer to add to the store
export default formSlice.reducer;