import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDate: "",
    selectedTime: "",
    field: "",
    name: "",
    email: "",
    whatsappNumber: "",
};

const interviewScheduleSlice = createSlice({
    name: "interviewSchedule",
    initialState,
    reducers: {
        updateInterview: (state, action) => {
            console.log("updateInterview - Payload:", action.payload);
            return { ...state, ...action.payload };
        },
        resetInterview: () => initialState,
    }
})
export const { updateInterview, resetInterview } = interviewScheduleSlice.actions;
export default interviewScheduleSlice.reducer

