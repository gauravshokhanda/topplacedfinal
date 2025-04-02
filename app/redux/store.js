import { configureStore } from "@reduxjs/toolkit";
import interviewScheduleReducer from "./slices/interviewScheduleSlice";

export const store=configureStore({
    reducer:{
        interviewSchedule:interviewScheduleReducer
    }
})