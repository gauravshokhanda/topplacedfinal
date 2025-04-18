import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import studentAuthReducer from "./slices/studentAuthSlice";
 
const rootReducer = combineReducers({
  studentAuth: studentAuthReducer,
});
 
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
 
export const persistor = persistStore(store);