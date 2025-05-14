import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import studentAuthReducer from "./slices/studentAuthSlice";
import interviewScheduleReducer from "./slices/interviewScheduleSlice";
import adminAuthReducer from "./slices/adminAuthSlice";

const rootReducer = combineReducers({
  studentAuth: studentAuthReducer,
  interviewSchedule: interviewScheduleReducer,
  adminAuth: adminAuthReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["studentAuth", "adminAuth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);